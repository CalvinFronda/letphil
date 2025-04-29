import React, { useEffect, useState } from "react";

const COUNTDOWN_TIME = 10;
export function QuestionComponent({ question, onAnswerSelect }) {
  const [countDown, setCountDown] = useState(COUNTDOWN_TIME);

  // Add resetCounter function
  const resetCounter = () => {
    setCountDown(COUNTDOWN_TIME);
  };

  // Wrap the onAnswerSelect with reset functionality
  const handleAnswerSelect = (answer) => {
    resetCounter();
    onAnswerSelect(answer);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          // if the timer gets to 0 you will get the answer wrong
          question.correct_answer === "True"
            ? handleAnswerSelect("False")
            : handleAnswerSelect("True");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question]); // Add question as dependency to reset timer when question changes

  return (
    <div className="question card">
      <div className="countdown-timer">
        <div
          className="timer-circle"
          style={{
            borderColor: countDown <= 3 ? "#dc3545" : "#198754",
            color: countDown <= 3 ? "#dc3545" : "#198754",
          }}
        >
          {countDown}
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: question.question }}></p>

      <div>
        <button
          onClick={() => handleAnswerSelect("True")}
          className="btn btn-success"
        >
          True
        </button>
        <button
          onClick={() => handleAnswerSelect("False")}
          className="btn btn-danger"
        >
          False
        </button>
      </div>
    </div>
  );
}
