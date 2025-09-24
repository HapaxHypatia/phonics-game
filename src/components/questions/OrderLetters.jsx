import {useEffect, useState} from "react";
import Letter from "../Letter";

function OrderLetters({ question, onAnswer }) {
  const { word } = question;
  const letters = word.name.split("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [clickedStates, setClickedStates] = useState(Array(letters.length).fill(null)); // "correct", "incorrect", null
  useEffect(() => {
    setClickedStates(Array(letters.length).fill(null));
    setFeedback(null);
    setCurrentIndex(0);
  }, [question]);

function handleClick(char, idx) {
  if (idx !== currentIndex) {
    // Incorrect click
    setClickedStates((prev) => {
      const newStates = [...prev]; // use functional update
      newStates[idx] = "incorrect";
      return newStates;
    });
    setFeedback("❌ Wrong letter");
    new Audio(`src/assets/audio/letters/${char}.mp3`).play();

    // reset red after short delay
    setTimeout(() => {
      setClickedStates((prev) => {
        const newStates = [...prev];
        // only reset if not already correct
        if (newStates[idx] !== "correct") newStates[idx] = null;
        return newStates;
      });
      setFeedback(null);
    }, 800);
    return;
  }

  // Correct click
  setClickedStates((prev) => {
    const newStates = [...prev]; // use functional update
    newStates[idx] = "correct";
    return newStates;
  });
  setCurrentIndex((prev) => prev + 1); // functional update
  setFeedback("✅ Correct!");
  new Audio(`src/assets/audio/letters/${char}.mp3`).play();

  if (currentIndex + 1 === letters.length) {
    // Finished word
    setTimeout(() => {
      setFeedback(null);
      onAnswer(true);
    }, 800);
  }
}


  return (
    <div className="question">
      <h2>Click the letters in order</h2>
      <div className="word-with-letters" style={{ display: "flex", gap: "10px" }}>
{letters.map((char, idx) => {
  const img = `src/assets/images/letters/${char}.png`;
  const audio = `src/assets/audio/letters/${char}.mp3`;
  let borderColor = clickedStates[idx] === "correct"
    ? "green"
    : clickedStates[idx] === "incorrect"
    ? "red"
    : "transparent";

  return (
    <div key={idx} style={{ border: `3px solid ${borderColor}`, borderRadius: "8px" }}>
      <Letter
        img={img}
        audio={audio}
        name={char}
        onClick={() => {
          // Only allow clicks if the letter is not already correct
          if (clickedStates[idx] !== "correct") handleClick(char, idx);
        }}
      />
    </div>
    );
    })}
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default OrderLetters;
