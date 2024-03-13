import React from "react";

const Finish = ({ points, totalPoints, highscore, dispatch }) => {
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
