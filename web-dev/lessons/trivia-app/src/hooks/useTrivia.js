import { useState, useEffect } from "react";

const REQUEST_TOKEN = "https://opentdb.com/api_token.php?command=request";
const COUNTDOWN_TIME = 4000;

export default function useTrivia(difficulty, category = 18, amount = 1) {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);

  const ENDPOINT = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=boolean`;

  async function fetchQuestions() {
    setLoading(true);
    const res = await fetch(ENDPOINT + "&token=" + token);
    const data = await res.json();

    const question = data.results;

    setQuestion(question);
    setLoading(false);
  }

  async function fetchSessionToken() {
    // Implement session token fetch
    if (!token) {
      // assign token
      const res = await fetch(REQUEST_TOKEN);
      const data = await res.json();

      setToken(data.token);
    }
  }

  useEffect(() => {
    setCountdown(6);
    const mySettimeOut = setTimeout(() => setCountdown(0), [COUNTDOWN_TIME]);
    return () => {
      clearTimeout(mySettimeOut);
    };
  }, [question]);

  useEffect(() => {
    fetchSessionToken();
  }, []);

  return {
    question,
    loading,
    countdown,
    token,
    fetchQuestions,
  };
}
