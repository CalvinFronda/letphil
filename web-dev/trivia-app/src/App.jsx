import "./App.css";
import { QuestionComponent } from "./components/QuestionComponent";
import { ResultsComponent } from "./components/ResultsComponent";
import { StartComponent } from "./components/StartComponent";
import { useEffect, useState } from "react";
import useTrivia from "./hooks/useTrivia";

const CATEGORY_API = "https://opentdb.com/api_category.php";

const GAME_STATES = {
  HOME: 0,
  RESULTS: 1,
};

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [gameState, setGameState] = useState(GAME_STATES.HOME); // 0, 1, 2
  const [gameScore, setGameScore] = useState({ correct: 0, incorrect: 0 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [questionAmount, setQuestionAmount] = useState(10);
  const [inputError, setInputError] = useState(false);
  const [difficult, setDifficult] = useState("easy");
  const [selectedCategory, setSelectedCategory] = useState(9);

  const { question, countdown, token, loading, fetchQuestions } = useTrivia(
    difficult,
    selectedCategory,
    questionAmount
  );

  const [categoryList, setCategoryList] = useState([]);

  async function handleAnswerSelect(answer) {
    if (answer == question[currentQuestionIndex].correct_answer) {
      setGameScore((prev) => ({
        ...prev,
        correct: prev.correct + 1,
      }));
      setQuestionAmount((prev) => prev - 1);
    } else {
      console.log("User guessed wrong");
      setGameScore((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
      }));
      setQuestionAmount((prev) => prev - 1);
    }

    //Move to the next question or end the game
    if (currentQuestionIndex < question.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameState(GAME_STATES.RESULTS);
      setGameStart(false);
    }
  }

  async function fetchCategories() {
    const res = await fetch(CATEGORY_API);
    const data = await res.json();

    setCategoryList(data.trivia_categories);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Trivia app</h1>
        <p>Loading ...</p>
      </div>
    );
  }

  const handleChangeDifficulty = (e) => {
    let diff = e.target.value;
    setDifficult(diff);
  };

  const handleChangeCategory = (e) => {
    let selectedCat = e.target.value;

    setSelectedCategory(selectedCat);
  };

  const handleQuestionAmount = (e) => {
    const selectedAmount = e.target.value;
    const numberValue = Number(selectedAmount);

    if (!numberValue || numberValue <= 0) {
      setInputError(true);
      setQuestionAmount(selectedAmount);
    } else {
      setInputError(false);
      setQuestionAmount(selectedAmount);
    }
  };

  const handleRestartGame = () => {
    setGameState(GAME_STATES["HOME"]);
    setGameScore({ correct: 0, incorrect: 0 });
    setCurrentQuestionIndex(0);
    setGameStart(false);
  };

  return (
    <div className="container">
      <h1>Trivia app</h1>

      {!gameStart && gameState !== GAME_STATES.RESULTS && (
        <>
          <div className="option__container-mb">
            <select onChange={handleChangeDifficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <p>
            How well can you answer
            <input
              className={`inline-input ${inputError ? "error" : ""}`}
              required
              min="1"
              type="number"
              value={questionAmount}
              onChange={handleQuestionAmount}
              title={inputError ? "Please enter a positive number" : ""}
            />
            questions?
          </p>

          <div className="option__container-mt">
            <select onChange={handleChangeCategory}>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <StartComponent
            token={token}
            disabled={inputError}
            onClick={() => {
              setGameStart(true);
              fetchQuestions();
            }}
          />
        </>
      )}

      {gameStart && (
        <div>
          <div>
            Question {currentQuestionIndex + 1} of {question.length}
          </div>
          <QuestionComponent
            counter={countdown}
            onAnswerSelect={handleAnswerSelect}
            question={question[currentQuestionIndex]}
          />
        </div>
      )}
      {gameState == GAME_STATES.RESULTS && !gameStart && (
        <ResultsComponent result={gameScore} resetGame={handleRestartGame} />
      )}
    </div>
  );
}

export default App;
