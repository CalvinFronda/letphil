import React from "react";

export default function Start({ startGame }: { startGame: () => void }) {
  return (
    <div className="start">
      <p>Press Start</p>
      <button onClick={startGame}>Start</button>
    </div>
  );
}
