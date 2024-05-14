import A from "../assets/Akey.png";
import D from "../assets/Dkey.png";
import SPACE from "../assets/SpaceKey.png";

interface propFunctions {
  resume: () => void;
}

function Pause({ resume }: propFunctions) {
  return (
    <section className="Pause">
      <h2>Game Paused</h2>
      <button onClick={resume} className="btns">
        <div className="btn-contents">
          <span>Resume</span>
        </div>
      </button>
      <div className="controls-container">
        Controls
        <div>
          Move
          <img src={A} alt="'A'" className="controls-img keys" />
          <img src={D} alt="'D'" className="controls-img keys" />
        </div>
        <div>
          Fire <img src={SPACE} alt="'Space'" className="controls-img space" />
        </div>
      </div>
    </section>
  );
}

export default Pause;
