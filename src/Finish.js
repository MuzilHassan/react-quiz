import React from "react";
import { useQuiz } from "./QuizContext";

const Finish = ({ totalPoints }) => {
  const { points, highscore, dispatch } = useQuiz();
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You got {points}out of {totalPoints} ({percentage}%)
      </p>
      <p className="highscore">Highscore is {highscore} points</p>

      <button className="btn " onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </>
  );
};

export default Finish;
