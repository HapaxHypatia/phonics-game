import Letter from "./Letter";

function Word({ word, onClick }) {
  return (
    <div className="word-with-letters" onClick={onClick} style={{ display: "flex", gap: "5px" }}>
      {word.name.split("").map((char, idx) => {
        const img = `src/assets/images/letters/${char}.png`;
        const audio = `src/assets/audio/letters/${char}.mp3`;

        return (
          <Letter
            key={idx}
            img={img}
            audio={audio}
            name={char}
          />
        );
      })}
    </div>
  );
}

export default Word;
