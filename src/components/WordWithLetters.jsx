import Letter from "./Letter";

function WordWithLetters({ word, onLetterClick }) {
  return (
    <div className="word-with-letters">
      {word.name.split("").map((char, idx) => {
        const img = `src/assets/images/letters/${char}.png`;
        const audio = `src/assets/audio/letters/${char}.mp3`;
        return (
          <Letter
            key={idx}
            img={img}
            audio={audio}
            name={char}
            onClick={() => onLetterClick(char, idx)}
          />
        );
      })}
    </div>
  );
}

export default WordWithLetters;
