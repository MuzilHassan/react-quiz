import React from "react";

const ProgressBar = ({ index, length, points, maxPoints, answer }) => {
  return (
    <header className="progress">
      <progress max={15} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}/</strong>
        {length}
      </p>
      <p>
        Points <strong>{points}/</strong>
        {maxPoints}
      </p>
    </header>
  );
};

export default ProgressBar;
