import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import Menu from "./Menu";
import "../styles/App.css";
import { Defender } from "../ts/classes/defender";
import { Game } from "../ts/game";
import { levelArray } from "../ts/objects/levels";
import { spaceCanvas } from "../ts/space";

function App() {
  const [defender, setDefender] = useState<Defender>();
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
      {!defender && !game && <Menu startGame={startGame}></Menu>}
      {defender && game && (
        <Canvas
          defender={defender}
          game={game}
          bgPause={bgPause}
          score={score}
        ></Canvas>
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