import React from "react";

export function StartComponent({ onClick, token, disabled }) {
  return (
    <div className="start">
      <button
        disabled={!token || disabled}
        onClick={onClick}
        className="btn btn-primary"
      >
        Start Game
      </button>
    </div>
  );
}
