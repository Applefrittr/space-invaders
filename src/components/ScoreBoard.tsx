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
  toggleScoreBoard: () => void;
}

function ScoreBoard({ toggleScoreBoard }: propObjects) {
  const [scores, setScores] = useState<DocumentData[]>();
  const [err, setErr] = useState<string>();

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

        setScores(userData);
      } catch (e) {
        setErr("Unable to retrieve scores...");
      }
    };

    getScores();
  }, []);

  return (
    <section className="ScoreBoard">
      <div className="sb-header">
        <h2>Top Scores</h2>
        <button onClick={toggleScoreBoard} className="btns">
          <div className="btn-contents">
            <span>Return</span>
          </div>
        </button>
      </div>
      <div className="sb-table">
        {scores &&
          scores.map((obj, index) => (
            <div className="user-card" key={index}>
              <p>{index + 1}.</p>
              <i>{obj.username}</i>
              <p>{obj.score}</p>
            </div>
          ))}
        {err && <i>{err}</i>}
      </div>
    </section>
  );
}

export default ScoreBoard;
