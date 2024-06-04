import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../db/firebase";

interface propObjects {
  gameOverMsg: string;
  restartGame: () => void;
  score: number;
  returnToMenuFromGO: () => void;
}

function GameOver({
  gameOverMsg,
  restartGame,
  score,
  returnToMenuFromGO,
}: propObjects) {
  const [newHighScore, setNewHighScore] = useState<boolean>();
  const [errMsg, setErrMsg] = useState<string>("");
  const [errWiggle, setErrWiggle] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const regex = new RegExp(/^[a-zA-Z0-9_.-]*$/);

  const submitScore = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrMsg("");
    if (disabled) return;

    if (!inputRef.current?.value) {
      setErrMsg("Enter a username to submit score");
      setErrWiggle(true);
      setTimeout(() => {
        setErrWiggle(false);
      }, 500);
      return;
    } else if (!regex.test(inputRef.current.value)) {
      setErrMsg("No special characters; letter, numbers, and dashes only");
      setErrWiggle(true);
      setTimeout(() => {
        setErrWiggle(false);
      }, 500);
    } else if (inputRef.current.value.length >= 30) {
      setErrMsg("Username cannot exceed 30 characters");
      setErrWiggle(true);
      setTimeout(() => {
        setErrWiggle(false);
      }, 500);
    } else {
      try {
        await addDoc(collection(db, "users"), {
          score: score,
          username: inputRef.current.value,
        });
        setDisabled(true);
        setErrMsg("Score submitted successfully");
      } catch (e) {
        setErrMsg("Something went wrong, try again later");
      }
    }
  };

  useEffect(() => {
    const getScores = async () => {
      try {
        const userData: DocumentData[] = [];

        const q = query(
          collection(db, "users"),
          orderBy("score", "desc"),
          limit(10)
        );

        const data = await getDocs(q);
        data.forEach((doc) => {
          userData.push(doc.data());
        });

        const lowestScore = userData[userData.length - 1].score;

        score > lowestScore || userData.length < 10
          ? setNewHighScore(true)
          : setNewHighScore(false);
      } catch (e) {
        console.log("Unable to retrieve scores...");
      }
    };

    getScores();
  }, []);

  return (
    <section className="GameOver">
      <div className="GO-container">
        <h2>{gameOverMsg}</h2>
        <i>Score: {score}</i>
        <div className="btn-container">
          {gameOverMsg !== "Victory!" && (
            <button onClick={restartGame} className="btns">
              <div className="btn-contents">
                <span>Retry</span>
              </div>
            </button>
          )}
          <button onClick={returnToMenuFromGO} className="btns">
            <div className="btn-contents">
              <span>Main Menu</span>
            </div>
          </button>
        </div>
      </div>
      {newHighScore && (
        <form className="score-form">
          <i>New High Score!</i>
          <div className="form-input-container">
            <input
              placeholder="username..."
              ref={inputRef}
              className={`GO-input ${disabled ? "disabled" : ""}`}
            ></input>
            <button
              className={`btns ${disabled ? "disabled" : ""}`}
              onClick={submitScore}
            >
              <div className="btn-contents">
                <span>Submit</span>
              </div>
            </button>
          </div>
          {errMsg && (
            <div className={`form-error ${errWiggle ? "wiggle" : ""}`}>
              {errMsg}
            </div>
          )}
        </form>
      )}
    </section>
  );
}

export default GameOver;
