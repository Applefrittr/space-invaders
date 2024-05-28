import {
  Firestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface propObjects {
  db: Firestore;
  toggleScoreBoard: () => void;
}

function ScoreBoard({ db, toggleScoreBoard }: propObjects) {
  const [scores, setScores] = useState<DocumentData[]>();

  useEffect(() => {
    const getScores = async () => {
      const userData: DocumentData[] = [];
      const query = await getDocs(collection(db, "users"));

      query.forEach((doc) => {
        userData.push(doc.data());
      });

      setScores(userData);
    };

    getScores();
  }, []);

  useEffect(() => {
    console.log(scores);
  }, [scores]);
  return (
    <section>
      <h2>Score Board</h2>
      <button onClick={toggleScoreBoard} className="btns">
        <div className="btn-contents">
          <span>Return</span>
        </div>
      </button>

      {scores &&
        scores.map((obj) => (
          <div>
            <p>{obj.score}</p>
            <p>{obj.username}</p>
          </div>
        ))}
    </section>
  );
}

export default ScoreBoard;
