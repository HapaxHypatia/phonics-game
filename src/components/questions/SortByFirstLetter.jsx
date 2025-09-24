import { useState, useEffect } from "react";
import Word from "../Word";

function SortByFirstLetter({ question, onAnswer }) {
  const { words, letters, targetPosition } = question;
  const [placedWords, setPlacedWords] = useState({});
  const [feedback, setFeedback] = useState(null);

  // Reset state when new question loads
  useEffect(() => {
    setPlacedWords({});
    setFeedback(null);
  }, [question]);

  function getLetter(w) {
    if (targetPosition === "first") return w.name[0];
    if (targetPosition === "last") return w.name[w.name.length - 1];
    if (targetPosition === "middle") return w.name[Math.floor(w.name.length / 2)];
    return "";
  }

  // --- Drag handlers ---
  function handleDragStart(e, word) {
    e.dataTransfer.setData("wordName", word.name);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, letterBox) {
    const wordName = e.dataTransfer.getData("wordName");
    const word = words.find((w) => w.name === wordName);
    if (!word) return; // safety check

    const correctLetter = getLetter(word);

    if (correctLetter === letterBox) {
      setPlacedWords((prev) => {
        const updated = { ...prev, [wordName]: letterBox };
        if (Object.keys(updated).length === words.length) {
          setTimeout(() => {
            setFeedback(null);
            onAnswer(true);
          }, 800);
        }
        return updated;
      });
      setFeedback("✅ Correct!");
      new Audio(word.audio).play();
    } else {
      setFeedback("❌ Try again");
      new Audio(word.audio).play();
      setTimeout(() => setFeedback(null), 800);
    }
  }

  return (
    <div className="question">
      <h2>Drag the words into the correct boxes ({targetPosition} letter)</h2>

      {/* Pool of unsorted words */}
      <div
        className="pool-container"
        style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}
      >
        {words
          .filter((w) => !placedWords[w.name])
          .map((w) => (
            <div
              key={w.name}
              draggable
              onDragStart={(e) => handleDragStart(e, w)}
              style={{
                cursor: "grab",
                border: "1px solid #ccc",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              <Word img={w.img} audio={w.audio} name={w.name} />
            </div>
          ))}
      </div>

      {/* Letter boxes */}
      <div className="sort-container" style={{ display: "flex", gap: "20px" }}>
        {letters.map((l) => (
          <div
            key={l}
            className="letter-box"
            onDrop={(e) => handleDrop(e, l)}
            onDragOver={handleDragOver}
            style={{
              minWidth: "150px",
              minHeight: "150px",
              border: "2px dashed #aaa",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <h3>{l.toUpperCase()}</h3>
            <div className="word-slot" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {Object.entries(placedWords)
                .filter(([wordName, letter]) => letter === l)
                .map(([wordName]) => {
                  const w = words.find((w) => w.name === wordName);
                  if (!w) return null; // safety check
                  return <Word key={wordName} img={w.img} audio={w.audio} name={w.name} />;
                })}
            </div>
          </div>
        ))}
      </div>

      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default SortByFirstLetter;
