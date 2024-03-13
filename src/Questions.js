import React from "react";

const Questions = ({ question, dispatch, answer }) => {
  console.log(question);
  return (
    <div>
      <h2>{question.question}</h2>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={question.correctOption}
      />
      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
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
