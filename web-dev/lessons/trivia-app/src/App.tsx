import { useEffect, useState } from "react";

import "./App.css";
import Start from "./components/Start";
import Question from "./components/Question";
import Results from "./components/Results";

const ENDPOINT = `https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=boolean`;

function App() {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("False");

  const handleGameStart = () => {
    setGameStart(!gameStart);
  };

  async function fetchNextQuestion() {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    setAnswer(data.results[0].correct_answer);
    setQuestion(data.results[0].question);
  }

  useEffect(() => {
    fetchNextQuestion();
  }, [gameStart]);

  return (
    <div className="container">
      {!gameStart && (
        <>
          <h1>Trivia App</h1>
          <Start startGame={handleGameStart} />
        </>
      )}
      {gameStart && (
        <>
          <Question question={question} />
        </>
      )}
      {!gameStart && showResults && <Results />}
    </div>
  );
}

export default App;
