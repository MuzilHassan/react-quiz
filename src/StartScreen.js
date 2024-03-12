import React from "react";

const StartScreen = ({ length, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcom to the react quiz</h2>
      <h3>{length} questions to test you react mystery </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Start" })}
      >
        Lets Start
      </button>
    </div>
  );
};

export default StartScreen;
