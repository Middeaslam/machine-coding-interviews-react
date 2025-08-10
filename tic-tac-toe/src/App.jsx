import GameBoard from './components/GameBoard';
import { useState } from 'react';

function App() {
  const [boardSize, setBoardSize] = useState(3);

  const handleBoardSize = (e) => {
    setBoardSize(Number(e.target.value));
  };

  return (
    <div className='app'>
      <h1>Tic Tac Toe</h1>

      <div className='board-size-selector'>
        <label htmlFor='boardSize'>Select Board Size</label>
        <select id='boardSize' value={boardSize} onChange={handleBoardSize}>
          <option value={3}>3X3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </div>

      <p>
        Selected board size: {boardSize}x{boardSize}
      </p>
      <GameBoard boardSize={boardSize} />
    </div>
  );
}

export default App;
