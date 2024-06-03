import { useEffect, useRef, useState } from "react";
import { Game } from "../ts/game";
import { Defender } from "../ts/classes/defender";
import Pause from "./Pause";
import GameOver from "./GameOver";
import { AnimatePresence, motion } from "framer-motion";

interface propObjects {
  defender: Defender;
  game: Game;
  bgPause: () => void;
  score: number;
  returnToMenu: () => void;
  returnToMenuFromGO: () => void;
}

function Canvas({
  defender,
  game,
  bgPause,
  returnToMenu,
  returnToMenuFromGO,
}: propObjects) {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [disablePauseBtn, setDisabledPauseBtn] = useState<boolean>(true);
  const [score, setScore] = useState<number>(defender.score);
  const [displayLvlBanner, setDisplayLvlBanner] = useState<boolean>(true);
  const [displayGameOver, setDisplayGameOver] = useState<boolean>(false);
  const [gameOverMsg, setGameOverMsg] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const disablePauseBtnRef = useRef<boolean>();
  disablePauseBtnRef.current = game.controlsLocked;

  const scoreRef = useRef<number>();
  scoreRef.current = score;

  const displayLvlRef = useRef<boolean>();
  displayLvlRef.current = displayLvlBanner;

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

  const restartGame = () => {
    setDisplayGameOver(false);
    game.gameRestart();
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
        if (defender.score !== scoreRef.current) {
          setScore(defender.score);
        }
        if (game.startAnimationsRunning !== displayLvlRef.current) {
          setDisplayLvlBanner(game.startAnimationsRunning);
        }
        if (game.controlsLocked !== disablePauseBtnRef.current) {
          setDisabledPauseBtn((prev) => !prev);
        }
        if (game.gameOver === true) {
          setGameOverMsg("Game Over");
          setDisplayGameOver(true);
        }
        if (game.gameWon === true) {
          setGameOverMsg("Victory!");
          setDisplayGameOver(true);
        }
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
          <button
            onClick={togglePause}
            className={`btns btns-small ${disablePauseBtn ? "disabled" : ""}`}
          >
            <div className="btn-contents">
              <span>Pause</span>
            </div>
          </button>
        </div>
      </div>
      {isPaused && (
        <Pause resume={togglePause} returnToMenu={returnToMenu}></Pause>
      )}
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
      {displayGameOver && (
        <GameOver
          gameOverMsg={gameOverMsg}
          restartGame={restartGame}
          score={defender.score}
          returnToMenuFromGO={returnToMenuFromGO}
        />
      )}
    </section>
  );
}

export default Canvas;
