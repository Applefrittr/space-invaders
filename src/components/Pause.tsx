import A from "../assets/Akey.png";
import D from "../assets/Dkey.png";
import SPACE from "../assets/SpaceKey.png";

interface propFunctions {
  resume: () => void;
  returnToMenu: () => void;
}

function Pause({ resume, returnToMenu }: propFunctions) {
  return (
    <section className="Pause">
      <h2>Game Paused</h2>
      <div className="btn-container">
        <button onClick={resume} className="btns">
          <div className="btn-contents">
            <span>Resume</span>
          </div>
        </button>
        <button onClick={returnToMenu} className="btns">
          <div className="btn-contents">
            <span>Main Menu</span>
          </div>
        </button>
      </div>
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
