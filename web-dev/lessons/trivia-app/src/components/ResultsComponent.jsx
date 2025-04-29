import React from "react";

export function ResultsComponent({ result, resetGame }) {
  return (
    <div className="results">
      <p>
        Result: You got {result.correct} out of{" "}
        {result.incorrect + result.correct} correct!
      </p>
      <p>Try again?</p>
      <button onClick={resetGame} className="btn btn-primary">
        Restart
      </button>
    </div>
  );
}
