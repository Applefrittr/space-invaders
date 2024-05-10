import { useEffect, useRef, useState } from "react";
import { Game } from "../ts/game";
import { Defender } from "../ts/classes/defender";
import Pause from "./Pause";
import { AnimatePresence, motion } from "framer-motion";

interface propObjects {
  defender: Defender;
  game: Game;
  bgPause: () => void;
  score: number;
}

function Canvas({ defender, game, bgPause }: propObjects) {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(defender.score);
  const [displayLvlBanner, setDisplayLvlBanner] = useState<boolean>(false);
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
    let updateStateFrameID: number;

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.focus();

      game.setCanvasCtx(ctx);
      game.gameLoop();

      const updateStates = () => {
        updateStateFrameID = requestAnimationFrame(updateStates);
        setScore(defender.score);
        setDisplayLvlBanner(game.startAnimationsRunning);
      };

      updateStates();
    }
    return () => {
      game.stop();
      cancelAnimationFrame(updateStateFrameID);
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
          <div>Score: {score}</div>
          <button className="pause-btn" onClick={togglePause}>
            Pause
          </button>
        </div>
      </div>
      {isPaused && <Pause resume={togglePause}></Pause>}
      <AnimatePresence>
        {displayLvlBanner && (
          <motion.section
            className="lvl-banner"
            initial={{ opacity: 0, x: -200 }}
            transition={{ duration: 1 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
          >
            <i>Stage {game.level + 1}</i>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Canvas;
