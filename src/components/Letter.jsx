function Letter({ img, audio, name, onClick }) {
  const sound = new Audio(audio);

  function handleClick(e) {
    e.preventDefault();
    sound.play();
    if (onClick) onClick(name); // notify parent
  }

  return (
    <div className="letter" id={name}>
      <img src={img} onClick={handleClick} />
    </div>
  );
}

export default Letter;
