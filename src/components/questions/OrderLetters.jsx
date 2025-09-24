import { useEffect, useState } from "react";
import Letter from "../Letter";
import "./questions.css";

function OrderLetters({ question, onAnswer }) {
  const { word } = question;
  const letters = word.name.split("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [clickedStates, setClickedStates] = useState(Array(letters.length).fill(null));

  useEffect(() => {
    setClickedStates(Array(letters.length).fill(null));
    setFeedback(null);
    setCurrentIndex(0);
  }, [question]);

  function handleClick(char, idx) {
    if (clickedStates[idx] === "correct") return;

    if (idx !== currentIndex) {
      setClickedStates((prev) => {
        const newStates = [...prev];
        newStates[idx] = "incorrect";
        return newStates;
      });
      setFeedback("❌ Wrong letter");
      new Audio(`src/assets/audio/letters/${char}.mp3`).play();

      setTimeout(() => {
        setClickedStates((prev) => {
          const newStates = [...prev];
          if (newStates[idx] !== "correct") newStates[idx] = null;
          return newStates;
        });
        setFeedback(null);
      }, 800);
      return;
    }

    setClickedStates((prev) => {
      const newStates = [...prev];
      newStates[idx] = "correct";
      return newStates;
    });
    setCurrentIndex((prev) => prev + 1);
    setFeedback("✅ Correct!");
    new Audio(`src/assets/audio/letters/${char}.mp3`).play();

    if (currentIndex + 1 === letters.length) {
      setTimeout(() => {
        setFeedback(null);
        onAnswer(true);
      }, 800);
    }
  }

  return (
    <div className="question">
      <h2>Click the letters in order</h2>
      <div className="word-with-letters">
        {letters.map((char, idx) => {
          let borderClass =
            clickedStates[idx] === "correct"
              ? "letter-box-order correct"
              : clickedStates[idx] === "incorrect"
              ? "letter-box-order incorrect"
              : "letter-box-order";

          return (
            <div key={idx} className={borderClass}>
              <Letter
                img={`src/assets/images/letters/${char}.png`}
                audio={`src/assets/audio/letters/${char}.mp3`}
                name={char}
                onClick={() => handleClick(char, idx)}
              />
            </div>
          );
        })}
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default OrderLetters;
