import { useEffect, useRef, useState } from "react";
import { Game } from "../ts/game";
import { Defender } from "../ts/classes/defender";
import Pause from "./Pause";

interface propObjects {
  defender: Defender;
  game: Game;
}

function Canvas({ defender, game }: propObjects) {
  const [isPaused, setIsPaused] = useState<boolean>(false);

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
    setIsPaused((prev) => !prev);
    canvasRef.current?.focus();
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.focus();

      game.setCanvas(canvas, ctx);
      game.start();
    }
    return () => {
      game.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div>Score: 10000</div>
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
