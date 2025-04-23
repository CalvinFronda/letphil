import { useState } from "react";

import "./App.css";

function App() {
  const [mood, setMood] = useState<string>();
  const [recentMood, setRecentMood] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);

  let today = new Date();

  let moods = ["😁 Happy", "🙁 Sad", "😐 Meh", "😡 Angry"];

  function handleMoodChange(e: string) {
    const selectedMood = e;
    setMood(selectedMood);

    setCount((prevCount) => (prevCount % 7) + 1);

    const dateStr = `${today.toLocaleString("default", { month: "short" })} ${
      today.getDate() + count
    }`;
    const newDay = `${dateStr} ${selectedMood}`;

    setRecentMood((prev) => {
      if (prev.length >= 7) {
        // Remove the oldest (first) entry before adding the new one
        const trimmed = prev.slice(1);
        return [...trimmed, newDay];
      }
      return [...prev, newDay];
    });
  }

  return (
    <>
      <div>
        <header>
          <h1>Mood Tracker</h1>
          <h2>Track how you feel each day</h2>
        </header>

        {moods.map((mood, i) => (
          <button
            key={i}
            className="button-mood"
            onClick={() => handleMoodChange(mood)}
          >
            {mood}
          </button>
        ))}

        <h4>You're currently feeling: {mood}</h4>

        <hr />
        <h4>Heres how you felt throughout the week!</h4>
        <div className="weekly-mood">
          {recentMood.map((m, i) => (
            <span className="weekly-mood-span" key={i}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
