import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../db/firebase";

interface propObjects {
  restartGame: () => void;
  score: number;
}

function GameOver({ restartGame, score }: propObjects) {
  const [newHighScore, setNewHighScore] = useState<boolean>();

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

        score > lowestScore ? setNewHighScore(true) : setNewHighScore(false);
      } catch (e) {
        console.log("Unable to retrieve scores...");
      }
    };

    getScores();
  }, []);

  return (
    <section className="GameOver">
      <div className="GO-container">
        <h2>Game Over</h2>
        <i>Score: {score}</i>
        <button onClick={restartGame} className="btns">
          <div className="btn-contents">
            <span>Retry</span>
          </div>
        </button>
      </div>
      {newHighScore && (
        <form className="score-form">
          <i>New High Score!</i>
          <div className="form-input-container">
            <input placeholder="username..."></input>
            <button className="btns">
              <div className="btn-contents">
                <span>Submit</span>
              </div>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default GameOver;
