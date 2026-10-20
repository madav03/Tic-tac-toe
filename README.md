# Simple Tic-Tac-Toe

A beginner-friendly two-player Tic-Tac-Toe game using HTML, CSS and JavaScript.

## Features
- Two-player local game (X and O take turns)
- Detects all 8 winning patterns: 3 rows, 3 columns and 2 diagonals
- Detects a draw when all 9 squares are filled without a winner
- Highlights the winning three squares
- Scoreboard for Player X, Player O and draws
- Restart round without clearing scores
- New game button resets both the board and scores
- Responsive layout for smaller screens

## Run the project
1. Extract this ZIP file.
2. Open the `SimpleTicTacToeApp` folder in VS Code.
3. Open `index.html` in your browser, or right-click it and choose **Open with Live Server** if you have the VS Code Live Server extension.
4. Click an empty square to play. X goes first, then O.

No API key, internet connection, backend or database is required for the game logic.

## Files
- `index.html`: webpage structure and the nine board squares
- `style.css`: colours, board layout and responsive styling
- `script.js`: turns, win/draw detection, score updates and restart controls
- `VIVA-GUIDE.md`: beginner explanation and sample viva answers

## Limitations
This version is a local two-player game on the same device. It has no computer opponent, online multiplayer or saved scores after the page is closed.
