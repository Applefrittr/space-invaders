interface propFunctions {
  startGame: () => void;
  toggleScoreBoard: () => void;
}

function Menu({ startGame, toggleScoreBoard }: propFunctions) {
  return (
    <section className="Menu">
      <h1>Space Invaders</h1>
      <button onClick={startGame} className="btns">
        <div className="btn-contents">
          <span>Start</span>
        </div>
      </button>
      <button onClick={toggleScoreBoard} className="btns">
        <div className="btn-contents">
          <span>High Scores</span>
        </div>
      </button>
    </section>
  );
}

export default Menu;
