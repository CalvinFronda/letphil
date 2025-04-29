import React from "react";

export function ResultsComponent({ result, resetGame }) {
  return (
    <div className="results">
      <p>
        Result: {result.correct} out of {result.incorrect}
      </p>
      <button onClick={resetGame} className="btn btn-primary">
        Restart
      </button>
    </div>
  );
}
