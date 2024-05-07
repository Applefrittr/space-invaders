interface propFunctions {
  startGame: () => void;
}

function Menu({ startGame }: propFunctions) {
  return (
    <>
      <h1>Space Invaders!</h1>
      <button onClick={startGame}>Start</button>
    </>
  );
}

export default Menu;
