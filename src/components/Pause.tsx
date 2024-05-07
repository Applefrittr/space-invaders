interface propFunctions {
  resume: () => void;
}

function Pause({ resume }: propFunctions) {
  return (
    <section className="Pause">
      <h2>Game Paused</h2>
      <button onClick={resume}>Resume</button>
    </section>
  );
}

export default Pause;
