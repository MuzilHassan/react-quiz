import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import ProgressBar from "./ProgressBar";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";

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
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaning,
  } = state;
  const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((date) => dispatch({ type: "Dataloaded", payload: date }))
      .catch((err) => dispatch({ type: "Error" }));
  }, []);

  console.log(questions.length);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {status === "Start" && (
          <>
            <ProgressBar
              length={questions.length}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              {answer !== null &&
                (index < questions.length - 1 ? (
                  <button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "nextQuestion" })}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "finish" })}
                  >
                    Finish
                  </button>
                ))}
              <Timer dispatch={dispatch} time={secondsRemaning} />
            </Footer>
          </>
        )}
        {status === "Finished" && (
          <Finish
            points={points}
            totalPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
