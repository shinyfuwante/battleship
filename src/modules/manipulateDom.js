const manipulateDom = () => {
  function createCell(size) {
    const pixel = document.createElement("div");
    pixel.style.width = `${100 / size}%`;
    pixel.style.height = `${100 / size}%`;
    pixel.classList.add("board-cell");
    return pixel;
  }

  function createBoard(element, board) {
    for (let i = 0; i < board.board.length; i += 1) {
      const row = board.board[i];
      for (let j = 0; j < row.length; j += 1) {
        const cell = createCell(row.length);
        cell.dataset.row = i;
        cell.dataset.col = j;
        element.appendChild(cell);
      }
    }
  }

  function domReceiveAttack(board, pixel, row, col) {
    if (board.receiveAttack(row, col)) {
      if (board.board[row][col]) {
        const ship = board.board[row][col];
        console.log(`ship present at: row: ${row} col: ${col}`);
        pixel.classList.add("ship");
        if (ship.isSunk()) {
          console.log("ship sunk");
        }
      } else {
        pixel.classList.add("miss");
      }
    } else {
      console.log("attack did not succeed");
      return false;
    }

    // check for game over
    if (board.checkGameOver()) {
      alert("game over");
    }
    return true;
  }
  return {
    createCell,
    createBoard,
    domReceiveAttack,
  }
};

export default manipulateDom;