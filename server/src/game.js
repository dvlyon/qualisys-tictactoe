// server/game.js
let wins = { X: 0, O: 0 };
let lastWinner = null;

function initializeGame() {
  return {
    board: Array(9).fill(null),
    winner: null,
    status: 'Next player: X',
  };
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      wins[board[a]]++;
      lastWinner = board[a];
      return board[a];
    }
  }

  return null;
}

function resetWins() {
  wins = { X: 0, O: 0 };
  lastWinner = null;
}

module.exports = { initializeGame, checkWinner, wins, resetWins, lastWinner };
