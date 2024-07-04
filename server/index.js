// server/index.js
const express = require('express');
const cors = require('cors');
const { checkWinner, initializeGame, wins, resetWins, lastWinner } = require('./src/game');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let game = initializeGame();

app.get('/api/game', (req, res) => {
  res.json(game);
});

app.get('/api/wins', (req, res) => {
  res.json(wins);
});

app.get('/api/last-winner', (req, res) => {
  res.json({ lastWinner });
});

app.post('/api/move', (req, res) => {
  const { index, player } = req.body;

  if (!game.board[index] && !game.winner) {
    game.board[index] = player;
    game.winner = checkWinner(game.board);
    game.status = game.winner ? `Winner: ${game.winner}` : `Next player: ${player === 'X' ? 'O' : 'X'}`;
  }

  res.json(game);
});

app.post('/api/reset', (req, res) => {
  game = initializeGame();
  res.json({ ...game, nextPlayer: lastWinner === 'X' ? 'O' : 'X' });
});

app.post('/api/reset-wins', (req, res) => {
  resetWins();
  game = initializeGame();
  res.json({ wins, game });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
