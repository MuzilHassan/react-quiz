import React from "react";
import { useQuiz } from "./QuizContext";

const StartScreen = ({}) => {
  const { dispatch, questions } = useQuiz();
  return (
    <div className="start">
      <h2>Welcom to the react quiz</h2>
      <h3>{questions.length} questions to test you react mystery </h3>
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
