import { useState } from "react";
import Canvas from "./Canvas";
import Menu from "./Menu";
import "../styles/App.css";
import { Defender } from "../ts/classes/defender";
import { Game } from "../ts/game";
import { levelArray } from "../ts/objects/levels";

function App() {
  const [defender, setDefender] = useState<Defender>();
  const [game, setGame] = useState<Game>();

  const startGame = () => {
    const player = new Defender();
    const newGame = new Game(player, levelArray, 0);
    setDefender(player);
    setGame(newGame);
  };
  return (
    <section className="App">
      {!defender && !game && <Menu startGame={startGame}></Menu>}
      {defender && game && <Canvas defender={defender} game={game}></Canvas>}
    </section>
  );
}

export default App;
