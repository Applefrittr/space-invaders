interface propFunctions {
  startGame: () => void;
}

function Menu({ startGame }: propFunctions) {
  return (
    <section className="Menu">
      <h1>Space Invaders</h1>
      <button onClick={startGame} className="btns">
        <div className="btn-contents">
          <span>Start</span>
        </div>
      </button>
    </section>
  );
}

export default Menu;
