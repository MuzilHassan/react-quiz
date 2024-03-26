import React from "react";
import { useQuiz } from "./QuizContext";

const Questions = () => {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h2>{question.question}</h2>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
    </div>
  );
};

export default Questions;

function Options({ options, dispatch, answer, correctOption }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {options.map((opt, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswer ? (index == correctOption ? "correct" : "wrong") : ""
          }`}
          key={opt}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswer}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
