import React from "react";
import { useQuiz } from "./QuizContext";

const ProgressBar = ({ maxPoints }) => {
  const { index, questions, points, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={15} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}/</strong>
        {questions.length}
      </p>
      <p>
        Points <strong>{points}/</strong>
        {maxPoints}
      </p>
    </header>
  );
};

export default ProgressBar;
