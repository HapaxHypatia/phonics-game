import { useState } from "react";
import WordWithLetters from "../WordWithLetters";

function FindFirstLetter({ question, onAnswer }) {
  const { word, targetPosition } = question;
  const [feedback, setFeedback] = useState(null); // success/fail

  const correctIndex =
    targetPosition === "first"
      ? 0
      : targetPosition === "last"
      ? word.name.length - 1
      : Math.floor(word.name.length / 2);

  function handleLetterClick(char, idx) {
    if (idx === correctIndex) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setFeedback(null);
        onAnswer(true); // notify wrapper
      }, 1000);
    } else {
      setFeedback("❌ Try again");
      onAnswer(false);
    }
  }

  return (
    <div className="question">
      <h2>Click the {targetPosition} letter</h2>
      <WordWithLetters
        word={word}
        targetPosition={targetPosition}
        onLetterClick={handleLetterClick}
      />
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default FindFirstLetter;
