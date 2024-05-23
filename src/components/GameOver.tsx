interface propObjects {
  restartGame: () => void;
}

function GameOver({ restartGame }: propObjects) {
  return (
    <section className="GameOver">
      <div className="GO-container">
        <h2>Game Over</h2>
        <button onClick={restartGame} className="btns">
          <div className="btn-contents">
            <span>Retry</span>
          </div>
        </button>
      </div>
    </section>
  );
}

export default GameOver;
