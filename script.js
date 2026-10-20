// Simple Tic-Tac-Toe: two players take turns choosing squares.

// 1. Select the HTML elements we need to update or listen to.
const cells = document.querySelectorAll(".cell");
const statusMessage = document.querySelector("#status-message");
const scoreXElement = document.querySelector("#score-x");
const scoreOElement = document.querySelector("#score-o");
const scoreDrawElement = document.querySelector("#score-draw");
const restartRoundButton = document.querySelector("#restart-round");
const newGameButton = document.querySelector("#new-game");

// 2. Each array position represents one square on the 3 x 3 board.
// An empty string means the square has not been played yet.
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let scores = { X: 0, O: 0, draws: 0 };

// These are the eight possible ways to make three in a row.
const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top-left to bottom-right
  [2, 4, 6]  // diagonal from top-right to bottom-left
];

// 3. Display whose turn it is, or show the result of the round.
function showStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`.trim();
}

// 4. Update the three score numbers on screen.
function renderScores() {
  scoreXElement.textContent = scores.X;
  scoreOElement.textContent = scores.O;
  scoreDrawElement.textContent = scores.draws;
}

// 5. Return the winning combination if one player has three matching marks.
function getWinningCombination() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      return combination;
    }
  }
  return null;
}

// 6. Handle a click on one of the nine squares.
function playMove(index) {
  // Do not accept a move after the round has ended or in a filled square.
  if (gameOver || board[index] !== "") return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].disabled = true;
  cells[index].classList.toggle("mark-o", currentPlayer === "O");

  const winningCombination = getWinningCombination();
  if (winningCombination) {
    gameOver = true;
    winningCombination.forEach((winningIndex) => {
      cells[winningIndex].classList.add("winning-cell");
    });
    scores[currentPlayer]++;
    renderScores();
    showStatus(`Player ${currentPlayer} wins!`, "success");
    disableAllCells();
    return;
  }

  // If no square is empty and there is no winner, the round is a draw.
  if (board.every((square) => square !== "")) {
    gameOver = true;
    scores.draws++;
    renderScores();
    showStatus("It's a draw! Start another round.", "draw");
    disableAllCells();
    return;
  }

  // Change from X to O, or from O to X.
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  showStatus(`Player ${currentPlayer}'s turn`);
}

function disableAllCells() {
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

// 7. Clear the board for the next round, but keep the scores.
function restartRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("mark-o", "winning-cell");
  });

  showStatus("Player X's turn");
}

// 8. Start a completely new game: reset the board and all scores.
function newGame() {
  scores = { X: 0, O: 0, draws: 0 };
  renderScores();
  restartRound();
  showStatus("New game started. Player X goes first.");
}

// Attach one click event listener to each square.
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    playMove(Number(cell.dataset.index));
  });
});

restartRoundButton.addEventListener("click", restartRound);
newGameButton.addEventListener("click", newGame);

// Set initial screen state.
renderScores();
showStatus("Player X's turn");
