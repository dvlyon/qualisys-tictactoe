# 🎮 Tic-Tac-Toe Electron App

Welcome to the coolest Tic-Tac-Toe game ever! This project combines the magic of Electron, React, and Express to deliver a sleek and modern version of the classic game we all know and love. Ready to dive in and have some fun?

## 🌟 Features

- **Gorgeous UI**: Enjoy a beautifully designed interface with smooth animations and a dark green background reminiscent of a pool table.
- **Interactive Gameplay**: Play against a friend with intuitive controls and visual feedback.
- **Score Tracking**: Keep track of the wins for each player.
- **Responsive Design**: The game looks great on any screen size.

## 🚀 Getting Started

Follow these simple steps to get the game up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your system.

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/dvlyon/qualisys-tictactoe.git
    cd qualisys-tictactoe
    ```

2. **Install dependencies** for both the Electron app and the server:
    ```sh
    # In the root directory
    cd electron-app
    npm install
    
    cd ../server
    npm install
    ```

### Running the App

1. **Start the Express server**:
    ```sh
    cd server
    node index.js
    ```

2. **Start the Electron app**:
    ```sh
    cd ../electron-app
    npm start
    ```

3. **Play the Game**: The game window should pop up, and you're ready to start playing!

## 📚 How to Play

- Player X and Player O take turns clicking on the grid to place their marks.
- The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins.
- The game will track wins for both players.
- Click the "Reset Game" button to start a new round.
- Click the "Reset Wins" button to reset the score and start fresh.

## 🎉 Enjoy!

Feel free to fork this repo, play around with the code, and make it your own. Have fun!

If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.

Happy gaming! 🎮
