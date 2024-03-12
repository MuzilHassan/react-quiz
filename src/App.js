import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "Dataloaded": {
      return { ...state, questions: action.payload, status: "Ready" };
    }
    case "Start":
      return { ...state, status: "Start" };
    case "Error":
      return { ...state, status: "Error" };
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status } = state;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((date) => dispatch({ type: "Dataloaded", payload: date }))
      .catch((err) => dispatch({ type: "Error" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {status === "Start" && <Questions />}
      </Main>
    </div>
  );
}

export default App;
