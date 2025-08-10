import useGameLogic from "../hooks/useGameLogic";

function GameBoard({ boardSize }) {
  const { board, currentPlayer, gameStatus, makeMove, resetGame, winner } =
    useGameLogic(boardSize);

  const handleSquareClick = (index) => {
    makeMove(index);
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
  };

  const getStatusMessage = () => {
    if (gameStatus === "won") {
      return `Player ${winner} Wins!`;
    } else if (gameStatus === "draw") {
      return "It's a Draw!";
    } else {
      return `Player ${currentPlayer}'s turn`;
    }
  };
  return (
    <div className="game-board-container">
      <h3>Game Board ({boardSize * boardSize})</h3>

      <div className="game-info">
        <h3>
          Game Board {boardSize}x{boardSize}
        </h3>
        <p className={`status-message ${gameStatus}`}>{getStatusMessage()}</p>
        <button onClick={resetGame} className="reset-button">
          {gameStatus === "playing" ? "Reset Game" : "Play Again"}
        </button>
      </div>

      <div className="game-board" style={gridStyle}>
        {board.map((square, index) => {
          return (
            <button
              key={index}
              className={`square ${square ? "filled" : ""}`}
              onClick={() => handleSquareClick(index)}
              disabled={gameStatus !== "playing"}
            >
              {square || ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GameBoard;
