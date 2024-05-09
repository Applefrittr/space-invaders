import { useEffect, useRef, useState } from "react";
import { Game } from "../ts/game";
import { Defender } from "../ts/classes/defender";
import Pause from "./Pause";

interface propObjects {
  defender: Defender;
  game: Game;
  bgPause: () => void;
  score: number;
}

function Canvas({ defender, game, bgPause }: propObjects) {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const [score, setScore] = useState<number>(defender.score);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  interface Event {
    key: string;
    repeat: boolean;
  }

  const handleKeyDown = (e: Event) => {
    defender.keyDown(e.key, e.repeat);
  };

  const handleKeyUp = (e: Event) => {
    defender.keyUp(e.key);
  };

  const togglePause = () => {
    game.togglePause();
    bgPause();
    setIsPaused((prev) => !prev);
    canvasRef.current?.focus();
  };

  useEffect(() => {
    let intervalID: number;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.focus();

      game.setCanvas(canvas, ctx);
      game.start();
      intervalID = setInterval(() => {
        setScore(defender.score);
      }, 250);
    }
    return () => {
      game.stop();
      clearInterval(intervalID);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setScore(defender.score);
  // }, [defender.score]);

  return (
    <section className="gameview">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        width={innerWidth}
        height={innerHeight}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      ></canvas>
      <div className="game-hud">
        <div className="hud-top">
          <div>Score: {score}</div>
          <button className="pause-btn" onClick={togglePause}>
            Pause
          </button>
        </div>
      </div>
      {isPaused && <Pause resume={togglePause}></Pause>}
    </section>
  );
}

export default Canvas;
