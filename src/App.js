import React, { useState, useEffect } from 'react';
import './App.css';

const generateCards = () => {
  const numbers = [1, 2, 3, 4, 1, 2, 3, 4];
  return numbers.map((number, index) => ({
    id: index,
    number,
    isFlipped: false,
    isMatched: false,
  }));
};

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function App() {
  const [cards, setCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
 function startGame() {
  setGameStarted(true);
  setTimer(0);
  setCards(shuffleArray(generateCards()));
  setGameOver(false);
  setOpenedCards([]);
  setMatchedPairs(0);
}
function endGame() {
  setGameStarted(false);
  setGameOver(true);
}
React.useEffect(() => {
  let interval;

  if (gameStarted && !gameOver) {
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  }

  return () => clearInterval(interval);
}, [gameStarted, gameOver]);
  useEffect(() => {
    if (openedCards.length === 2) {
      const [card1, card2] = openedCards;
      if (card1.number === card2.number) {
        const updatedCards = cards.map((card) =>
          card.id === card1.id || card.id === card2.id
            ? { ...card, isMatched: true }
            : card
        );
        setMatchedPairs(matchedPairs + 1);
        setCards(updatedCards);
      } else {
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(updatedCards);
        }, 1000);
      }
      setOpenedCards([]);
    }
  }, [openedCards, cards, matchedPairs]);

  const handleCardClick = (clickedCard) => {
    if (openedCards.length < 2 && !clickedCard.isFlipped && !clickedCard.isMatched) {
      const updatedCards = cards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      );
      setCards(updatedCards);
      setOpenedCards([...openedCards, clickedCard]);
    }
  };
  
  return (
    <div className="App">
    <h1>Memory Card Game</h1>
     <button onClick={endGame} disabled={!gameStarted || gameOver} className='btn'>
        End Game
      </button><button className="start-button btn" onClick={startGame}>
        Start Game
      </button>
      <div>
        <p>Time: {timer} seconds</p>
        <div className="game-container">
        {cards.map((card) => (
  <div
    key={card.id}
     className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
    onClick={() => handleCardClick(card)}
  >
    {card.isFlipped ? card.number : '?'}
  </div>
))}
</div>
</div>
  </div>
  );
}
export default App;


