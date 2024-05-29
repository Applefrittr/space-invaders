import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import Menu from "./Menu";
import "../styles/App.css";
import { Defender } from "../ts/classes/defender";
import { Game } from "../ts/game";
import { levelArray } from "../ts/objects/levels";
import { spaceCanvas } from "../ts/space";
import ScoreBoard from "./ScoreBoard";

function App() {
  const [defender, setDefender] = useState<Defender>();
  const [displayScoreBoard, setDisplayScoreBoard] = useState<boolean>(false);
  const [game, setGame] = useState<Game>();
  const [score, setScore] = useState<number>(0);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);

  const startGame = () => {
    const player = new Defender();
    const newGame = new Game(player, levelArray, 0);
    setDefender(player);
    setGame(newGame);
    setScore(player.score);
  };

  const returnToMenu = () => {
    setDefender(undefined);
    setGame(undefined);
    spaceCanvas.pause();
  };

  const toggleScoreBoard = () => {
    setDisplayScoreBoard((prev) => !prev);
  };

  const bgPause = () => {
    spaceCanvas.pause();
  };

  useEffect(() => {
    if (bgCanvasRef.current) {
      const bgCanvas = bgCanvasRef.current;
      const ctx = bgCanvas.getContext("2d");

      spaceCanvas.setContext(ctx);
      spaceCanvas.start();
    }
  }, []);

  return (
    <section className="App">
      {!defender && !game && !displayScoreBoard && (
        <Menu startGame={startGame} toggleScoreBoard={toggleScoreBoard}></Menu>
      )}
      {defender && game && !displayScoreBoard && (
        <Canvas
          defender={defender}
          game={game}
          bgPause={bgPause}
          score={score}
          returnToMenu={returnToMenu}
        ></Canvas>
      )}
      {displayScoreBoard && (
        <ScoreBoard toggleScoreBoard={toggleScoreBoard}></ScoreBoard>
      )}
      <canvas
        ref={bgCanvasRef}
        width={innerWidth}
        height={innerHeight}
        className="bg-canvas"
      ></canvas>
    </section>
  );
}

export default App;
