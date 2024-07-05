import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

interface Game {
  board: Array<string | null>;
  winner: null | 'X' | 'O';
  player: 'X' | 'O';
}

const initialGame: Game = {
  board: Array(9).fill(null),
  winner: null,
  player: 'X',
};

const App = () => {
  const [game, setGame] = useState(initialGame);
  const [wins, setWins] = useState({ X: 0, O: 0 });
  const [lastWinner, setLastWinner] = useState<string | null>(null);

  const { board, winner, player } = game;

  const isDraw = board.every((cell) => cell);

  useEffect(() => {
    const initialiseGame = async () => {
      const gameRes = await axios.post<Game>('http://localhost:3001/api/game', {
        player: 'X',
      });

      setGame(gameRes.data);
    };

    initialiseGame();
  }, []);

  const handleClick = async (index: number) => {
    if (board[index] || winner) return;

    const moveRes = await axios.post<Game>('http://localhost:3001/api/move', {
      game,
      index,
    });

    setGame(moveRes.data);

    if (!!moveRes.data.winner) {
      setWins((prev) => {
        return {
          X: prev.X + (moveRes.data.winner === 'X' ? 1 : 0),
          O: prev.O + (moveRes.data.winner === 'O' ? 1 : 0),
        };
      });
      setLastWinner(moveRes.data.winner);
    }
  };

  const handleReset = async () => {
    const resetRes = await axios.post<Game>('http://localhost:3001/api/game', {
      player: lastWinner === 'X' ? 'O' : 'X',
    });

    setGame(resetRes.data);
  };

  const handleResetWins = async () => {
    await handleReset();
    setWins({ X: 0, O: 0 });
    setLastWinner(null);
  };

  const renderStatus = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Draw!'
    : `Next player: ${player}`;

  const renderSquare = (index: number) => (
    <button
      className={`square ${board[index]} ${
        winner || isDraw
          ? 'disabled'
          : player === 'X'
          ? 'blue-hover'
          : 'red-hover'
      }`}
      onClick={() => handleClick(index)}
      disabled={!!board[index]}
    >
      {board[index]}
    </button>
  );

  return (
    <div>
      <div className="status">{renderStatus}</div>
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
        <button onClick={handleReset} disabled={!winner && !isDraw}>
          Reset Game
        </button>
        <button onClick={handleResetWins}>Reset Wins</button>
      </div>
    </div>
  );
};

export default App;
