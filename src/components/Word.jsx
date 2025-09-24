function Word(props) {
  const { img, audio, name, onClick } = props;
  const sound = new Audio(audio);

  function playSound(e) {
    e.preventDefault();
    sound.play();
    if (onClick) onClick();
  }

  return (
    <div className="word" id={name}>
      <img src={img} onClick={playSound} alt={name} />
    </div>
  );
}

export default Word;
