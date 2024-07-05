const express = require("express");
const cors = require("cors");
const { initialiseGame, checkWinner } = require("./src/game");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/game", (req, res) => {
  const { player } = req.body;

  res.json(initialiseGame(player));
});

app.post("/api/move", (req, res) => {
  const { game, index } = req.body;

  if (!game.board[index] && !game.winner) {
    game.board[index] = game.player;
    game.winner = checkWinner(game.board);
    game.player = game.player === "X" ? "O" : "X";
  }

  res.json(game);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
