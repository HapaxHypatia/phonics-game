import {useEffect, useState} from "react";
import Word from "../Word";

function FindSameFirstLetter({ question, onAnswer }) {
  useEffect(() => {
      setFoundWords([]);
      setFeedback(null);
    }, [question]);
  const { words, word: targetWord, targetPosition } = question;
  const [feedback, setFeedback] = useState(null);
  const [foundWords, setFoundWords] = useState([]); // names of correctly clicked words



  function getLetter(w) {
    if (targetPosition === "first") return w.name[0];
    if (targetPosition === "last") return w.name[w.name.length - 1];
    if (targetPosition === "middle") return w.name[Math.floor(w.name.length / 2)];
    return "";
  }

  function handleClick(w) {
    if (foundWords.includes(w.name)) return; // ignore already found words

    const letterOfWord = getLetter(w);
    const targetLetter = getLetter(targetWord);

    if (letterOfWord === targetLetter) {
      // Correct click
      const newFoundWords = [...foundWords, w.name];
      setFoundWords(newFoundWords);

      setFeedback("✅ Correct!");

      // Only move to next question when all correct words are found
      const totalCorrect = words.filter((wordItem) => getLetter(wordItem) === targetLetter).length;
      if (newFoundWords.length >= totalCorrect) {
        setTimeout(() => {
          setFeedback(null);
          onAnswer(true);
        }, 800);
      }
    } else {
      // Incorrect click
      setFeedback("❌ Try again");
      setTimeout(() => setFeedback(null), 800);
      // Do NOT call onAnswer — user can continue
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
              style={{
                opacity: isFound ? 0.5 : 1,
                border: isFound ? "2px solid green" : "none",
                display: "inline-block",
                margin: "10px",
                cursor: isFound ? "default" : "pointer",
              }}
            >
              <Word img={w.img} audio={w.audio} name={w.name} onClick={() => handleClick(w)} />
            </div>
          );
        })}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default FindSameFirstLetter;
