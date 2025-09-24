// src/components/Letter.js
import React, { useRef, useEffect } from "react";

function Letter({ img, audio: audioSrc, name, onClick }) {
  const audioRef = useRef(null);

  // Reset cached audio if source changes
  useEffect(() => {
    audioRef.current = null;
  }, [audioSrc]);

  function handleClick(e) {
    e.preventDefault();
    // Lazily create the Audio object and reuse it
    if (!audioRef.current) audioRef.current = new Audio(audioSrc);
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      /* ignore play() promise rejection (autoplay policies) */
    });

    // notify parent (if parent passed an onClick prop)
    if (onClick) onClick(e);
  }

  return (
    <div className="letter" id={name}>
      <img src={img} onClick={handleClick} alt={name} />
    </div>
  );
}

export default Letter;
