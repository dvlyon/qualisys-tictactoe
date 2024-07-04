// src/renderer/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [status, setStatus] = useState('Next player: X');
  const [player, setPlayer] = useState('X');
  const [wins, setWins] = useState({ X: 0, O: 0 });
  const [lastWinner, setLastWinner] = useState<string | null>(null);

  useEffect(() => {
    const initialiseGame = async () => {
      const gameRes = await axios.get('http://localhost:3001/api/game');
      setBoard(gameRes.data.board);
      setStatus(gameRes.data.status);

      const winsRes = await axios.get('http://localhost:3001/api/wins');
      setWins(winsRes.data);

      const lastWinnerRes = await axios.get('http://localhost:3001/api/last-winner');
      setLastWinner(lastWinnerRes.data.lastWinner);
    }

    initialiseGame();
  }, []);

  const handleClick = async (index: number) => {
    if (board[index] || status.includes('Winner')) return;

    const moveRes = await axios.post('http://localhost:3001/api/move', {
      index,
      player,
    });
    setBoard(moveRes.data.board);
    setStatus(moveRes.data.status);

    if (moveRes.data.winner) {
      setLastWinner(player);
    }

    if (moveRes.data.board.every((cell: string | null) => cell !== null) && !moveRes.data.winner) {
      setStatus('Draw! Click Reset Game to play again.');
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }

    const winsRes = await axios.get('http://localhost:3001/api/wins');
    setWins(winsRes.data);
  };

  const handleReset = async () => {
    const resetRes = await axios.post('http://localhost:3001/api/reset');
    setBoard(resetRes.data.board);
    setStatus(resetRes.data.status);
    setPlayer(resetRes.data.nextPlayer);
  };

  const handleResetWins = async () => {
    await axios.post('http://localhost:3001/api/reset-wins');
    const resetRes = await axios.post('http://localhost:3001/api/reset');
    setBoard(resetRes.data.board);
    setStatus(resetRes.data.status);
    setPlayer('X');
    setWins(resetRes.data.wins);
    setLastWinner(null);
  };

  const renderSquare = (index: number) => (
    <button
      className={`square ${board[index]} ${status.includes('Winner') || status.includes('Draw') ? 'disabled' : player === 'X' ? 'blue-hover' : 'red-hover'}`}
      onClick={() => handleClick(index)}
      disabled={!!board[index]}
    >
      {board[index]}
    </button>
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div className="board-row" key={row}>
              {Array(3)
                .fill(null)
                .map((_, col) => renderSquare(row * 3 + col))}
            </div>
          ))}
      </div>
      <div className="wins">
        <div>X wins: {wins.X}</div>
        <div>O wins: {wins.O}</div>
      </div>
      <div className="button-container">
        <button onClick={handleReset} disabled={!status.includes('Winner') && !status.includes('Draw')}>Reset Game</button>
        <button onClick={handleResetWins}>Reset Wins</button>
      </div>
    </div>
  );
};

export default App;
