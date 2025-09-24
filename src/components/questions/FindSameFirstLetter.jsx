import { useEffect, useState } from "react";
import Word from "../Word";

function FindSameFirstLetter({ question, onAnswer }) {
  const { words, targetPosition } = question; // no targetWord needed now
  const [feedback, setFeedback] = useState(null);
  const [foundWords, setFoundWords] = useState([]);

  useEffect(() => {
    setFoundWords([]);
    setFeedback(null);
  }, [question]);

  function getLetter(w) {
    if (targetPosition === "first") return w.name[0];
    if (targetPosition === "last") return w.name[w.name.length - 1];
    if (targetPosition === "middle") return w.name[Math.floor(w.name.length / 2)];
    return "";
  }

  // Pick the letter of the first word in the list as the target
  const targetLetter = getLetter(words[0]);

  function handleClick(w) {
    if (foundWords.includes(w.name)) return;

    const letterOfWord = getLetter(w);

    if (letterOfWord === targetLetter) {
      setFoundWords((prev) => [...prev, w.name]);
      setFeedback("✅ Correct!");

      const totalCorrect = words.filter((wordItem) => getLetter(wordItem) === targetLetter).length;
      if (foundWords.length + 1 >= totalCorrect) {
        setTimeout(() => {
          setFeedback(null);
          onAnswer(true);
        }, 800);
      }
    } else {
      setFeedback("❌ Try again");
      setTimeout(() => setFeedback(null), 800);
    }
  }

  return (
    <div className="question">
      <h2>Find words with the same {targetPosition} letter</h2>
      <div className="word-list">
        {words.map((w, idx) => {
          const isFound = foundWords.includes(w.name);
          return (
            <div
              key={idx}
              className={`word-item ${isFound ? "found" : ""}`}
              onClick={() => !isFound && handleClick(w)}
            >
              <Word word={w} />
            </div>
          );
        })}
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default FindSameFirstLetter;
