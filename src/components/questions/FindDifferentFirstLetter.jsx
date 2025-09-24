import {useEffect, useState} from "react";
import Word from "../Word";

function FindDifferentFirstLetter({ question, onAnswer }) {
  const { words, word: targetWord, targetPosition } = question;
  const [feedback, setFeedback] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    setFound(false);
    setFeedback(null);
  }, [question]);

  function getLetter(w) {
    if (targetPosition === "first") return w.name[0];
    if (targetPosition === "last") return w.name[w.name.length - 1];
    if (targetPosition === "middle") return w.name[Math.floor(w.name.length / 2)];
    return "";
  }

  const targetLetter = getLetter(targetWord); // <-- move this here

  function handleClick(w) {
    if (found) return;

    const letterOfWord = getLetter(w);

    if (letterOfWord !== targetLetter) {
      // Correct "different" word
      setFound(true);
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setFeedback(null);
        onAnswer(true);
      }, 1000);
    } else {
      // Incorrect word
      setFeedback("❌ Try again");
      setTimeout(() => setFeedback(null), 800);
    }
  }

  // Find the odd word (different letter)
  const oddWord = words.find((w) => getLetter(w) !== targetLetter);

return (
    <div className="question">
      <h2>Find the word with a different {targetPosition} letter</h2>
      <div className="word-list">
        {words.map((w, idx) => (
          <div
            key={idx}
            className="word-item"
            style={{
              opacity: found && w.name !== oddWord?.name ? 0.5 : 1,
              border: found && w.name === oddWord?.name ? "2px solid green" : "none",
              cursor: found ? "default" : "pointer",
            }}
            onClick={() => handleClick(w)}
          >
            <Word img={w.img} audio={w.audio} name={w.name} />
          </div>
        ))}
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}


export default FindDifferentFirstLetter;
