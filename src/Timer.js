import React, { useEffect } from "react";

const Timer = ({ dispatch, time }) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "reduceTimer" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
};

export default Timer;
