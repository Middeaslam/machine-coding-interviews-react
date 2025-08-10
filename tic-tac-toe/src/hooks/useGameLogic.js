import { useState } from "react";

function useGameLogic(boardSize) {
  const [board, setBoard] = useState(() =>
    Array(boardSize * boardSize).fill(null)
  );

  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("playing");
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    //Check all rows
    for (let row = 0; row < boardSize; row++) {
      let isWinningRow = true;
      const firstSquare = board[row * boardSize]; // First square in the row

      if (firstSquare === null) continue; // Skip if it startws with empty

      //Check if all squares in the row match the first square
      for (let col = 0; col < boardSize; col++) {
        const index = row * boardSize + col;
        if (board[index] !== firstSquare) {
          isWinningRow = false;
          break;
        }
      }

      if (isWinningRow) {
        console.log(`Player ${firstSquare} won with row ${row}!`);
        return firstSquare;
      }
    }

    //Chekc all columns
    for (let col = 0; col < boardSize; col++) {
      let isWinningCol = true;
      const firstSquare = board[col];

      if (firstSquare === null) continue;

      for (let row = 0; row < boardSize; row++) {
        const index = row * boardSize + col;
        if (board[index] !== firstSquare) {
          isWinningCol = false;
          break;
        }
      }

      if (isWinningCol) {
        console.log(`Player ${firstSquare} won with col ${col}!`);
        return firstSquare;
      }
    }

    //Check Main diagonal
    let isWinningMainDiag = true;
    const firstSquareMainDiag = board[0];

    if (firstSquareMainDiag !== null) {
      for (let i = 0; i < boardSize; i++) {
        const index = i * boardSize + i;
        if (board[index] !== firstSquareMainDiag) {
          isWinningMainDiag = false;
          break;
        }
      }

      if (isWinningMainDiag) {
        console.log(`Player ${firstSquareMainDiag} won with main diagonal!`);
        return firstSquareMainDiag;
      }
    }

    //Check anti-diagonall
    let isWinningAntiDiag = true;
    const firstSquareAntiDiag = board[boardSize - 1];

    if (firstSquareAntiDiag !== null) {
      for (let i = 0; i < boardSize; i++) {
        const index = i * boardSize + (boardSize - 1 - i);
        if (board[index] !== firstSquareAntiDiag) {
          isWinningAntiDiag = false;
          break;
        }
      }

      if (isWinningAntiDiag) {
        console.log(`Player ${firstSquareAntiDiag} won anti-diagonal!`);
        return firstSquareAntiDiag;
      }
    }

    const isBoardFull = board.every((square) => square !== null);
    if (isBoardFull) {
      console.log("Game is a draw!");
      return "draw";
    }

    return null;
  };

  const makeMove = (index) => {
    if (board[index] !== null) {
      console.log("Sqaure already taken");
      return;
    }

    if (gameStatus !== "playing") {
      console.log("Game is over!");
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    console.log(`Player ${currentPlayer} moved to square ${index}`);

    const gameResult = checkWinner(newBoard);

    if (gameResult === "draw") {
      setGameStatus("draw");
      setWinner(null);
    } else if (gameResult) {
      setGameStatus("won");
      setWinner(gameResult);
      console.log(`Game over! Player ${gameResult} wins!`);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    console.log("reset game");
    setBoard(Array(boardSize * boardSize).fill(null));
    setCurrentPlayer("X");
    setGameStatus("playing");
    setWinner(null);
  };

  return { board, currentPlayer, gameStatus, makeMove, resetGame, winner };
}

export default useGameLogic;
