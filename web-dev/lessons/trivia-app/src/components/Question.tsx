import React, { useState } from "react";

export default function Question({ question }: { question: string }) {
  const [userAnswer, setUserAnswer] = useState<string>("False");

  function handleUserAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    setUserAnswer(e.currentTarget.value);
  }

  return (
    <div className="question">
      <p>{question}</p>
      <div className="action">
        <button value={"True"} onClick={(e) => handleUserAnswer(e)}>
          True
        </button>
        <button value={"False"} onClick={(e) => handleUserAnswer(e)}>
          False
        </button>
      </div>
    </div>
  );
}
