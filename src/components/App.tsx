import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import Menu from "./Menu";
import "../styles/App.css";
import { Defender } from "../ts/classes/defender";
import { Game } from "../ts/game";
import { levelArray } from "../ts/objects/levels";
import { spaceCanvas } from "../ts/space";
import ScoreBoard from "./ScoreBoard";
import { trackList } from "../ts/objects/trackList";
import Volume from "../assets/volume.svg";
import Mute from "../assets/mute.svg";

function App() {
  const [defender, setDefender] = useState<Defender>();
  const [displayScoreBoard, setDisplayScoreBoard] = useState<boolean>(false);
  const [game, setGame] = useState<Game>();
  const [score, setScore] = useState<number>(0);
  const [currTrack, setCurrTrack] = useState<string>(trackList[0].name);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);

  const audio = useRef<HTMLAudioElement>(null);
  let trackIndex = 0;

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

  const returnToMenuFromGO = () => {
    setDefender(undefined);
    setGame(undefined);
    spaceCanvas.resume();
  };

  const toggleScoreBoard = () => {
    setDisplayScoreBoard((prev) => !prev);
  };

  const bgPause = () => {
    spaceCanvas.pause();
  };

  const playNext = () => {
    trackIndex = trackIndex++ < trackList.length - 1 ? trackIndex++ : 0;
    if (audio.current) {
      audio.current.src = trackList[trackIndex].src;
      setCurrTrack(trackList[trackIndex].name);
      audio.current.play();
    }
  };

  const toggleMute = () => {
    if (audio.current) {
      audio.current.muted = !audio.current.muted;
      audio.current.defaultMuted = !audio.current.defaultMuted;
      setIsMuted((prev) => !prev);
    }
  };

  useEffect(() => {
    if (audio.current) {
      audio.current.defaultMuted = true;
      audio.current.muted = true;
    }
    if (bgCanvasRef.current) {
      const bgCanvas = bgCanvasRef.current;
      const ctx = bgCanvas.getContext("2d");

      spaceCanvas.setContext(ctx);
      spaceCanvas.start();
    }
  }, []);

  return (
    <section className="App">
      <div className="audio-player">
        <audio onEnded={playNext} ref={audio} muted autoPlay>
          <source src={trackList[0].src} type="audio/ogg" />
        </audio>
        <i>{currTrack}</i>
        <img
          src={isMuted ? Mute : Volume}
          onClick={toggleMute}
          className="mute-toggle"
        />
      </div>
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
          returnToMenuFromGO={returnToMenuFromGO}
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
