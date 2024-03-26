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
import { useQuiz } from "./QuizContext";

function App() {
  const {
    questions,
    status,
    index,
    answer,

    dispatch,
  } = useQuiz();
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
        {status === "Ready" && <StartScreen />}
        {status === "Start" && (
          <>
            <ProgressBar maxPoints={maxPoints} />
            <Questions />
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
              <Timer />
            </Footer>
          </>
        )}
        {status === "Finished" && <Finish totalPoints={maxPoints} />}
      </Main>
    </div>
  );
}

export default App;
