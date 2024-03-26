import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const secondsPerQuestion = 20;
const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaning: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "Dataloaded": {
      return { ...state, questions: action.payload, status: "Ready" };
    }
    case "Start":
      return {
        ...state,
        status: "Start",
        secondsRemaning: state.questions.length * secondsPerQuestion,
      };
    case "Error":
      return { ...state, status: "Error" };
    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload == question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }

    case "finish": {
      return {
        ...state,
        status: "Finished",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };
    }
    case "reset": {
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: "Ready",
      };
    }
    case "reduceTimer": {
      return {
        ...state,
        secondsRemaning: state.secondsRemaning - 1,
        status: state.secondsRemaning > 0 ? state.status : "Finished",
      };
    }
  }
}
const QuizProvider = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaning,
  } = state;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((date) => dispatch({ type: "Dataloaded", payload: date }))
      .catch((err) => dispatch({ type: "Error" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaning,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("You have used context outside provider ");
  return context;
};

export { QuizProvider, useQuiz };
