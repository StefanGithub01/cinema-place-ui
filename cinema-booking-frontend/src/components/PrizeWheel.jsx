import React, { useState, useEffect } from 'react';
import './PrizeWheel.css'; // CSS for styling

const PrizeWheel = ({ prizes, onSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrizeIndex, setSelectedPrizeIndex] = useState(null);

  useEffect(() => {
    let intervalId;
    if (isSpinning) {
      // Start highlighting prizes until spinning stops
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setSelectedPrizeIndex(randomIndex);
      }, 100); // Adjust duration as needed
    } else {
      // If spinning stops, select the final prize
      if (selectedPrizeIndex !== null) {
        const timeoutId = setTimeout(() => {
          onSpin(prizes[selectedPrizeIndex]);
        }, 1000); // Adjust timeout as needed to match the duration of the spinning animation
        return () => clearTimeout(timeoutId);
      }
      setSelectedPrizeIndex(null);
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isSpinning, prizes, onSpin, selectedPrizeIndex]);

  const spinWheel = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000); // Simulate spinning animation, adjust duration as needed
  };

  return (
    <div className="prize-wheel-container">
      <div className="prizes">
        {prizes.map((prize, index) => (
          <div key={index} className={`prize ${selectedPrizeIndex === index && 'selected'}`}>{prize}</div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={isSpinning}>Spin</button>
    </div>
  );
};

export default PrizeWheel;
