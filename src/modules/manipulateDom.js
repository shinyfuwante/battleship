const domLeftGB = document.querySelector(".left-gameboard");
const domRightGB = document.querySelector(".right-gameboard");

const manipulateDom = (playerBoard, playerBoard2) => {
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
  function domAI() {
    const domBoard = domLeftGB;
    const pixelList = Array.from(domBoard.childNodes);
    // need to parseInt because dataset.row is a string. Add a radix of 10 for decimal numbers.
    let attackSuccess = false;
    while (attackSuccess === false) {
        const [row, col] = playerBoard.randomMove();
        const targetPixel = pixelList.filter((pixel) => parseInt(pixel.dataset.row, 10) === row && parseInt(pixel.dataset.col, 10) === col);
        attackSuccess = domReceiveAttack(playerBoard, targetPixel[0], row, col);
    };
  }
  function processClick(board, pixel, row, col) {
    // player turn
    domReceiveAttack(board, pixel, row, col);
    // ai turn
    domAI();
  }
  function cellClick(e) {
    let parentBoard;
    if (e.path[1] === domLeftGB) {
        parentBoard = playerBoard;
    } else {
        parentBoard = playerBoard2;
    }
    const pixel = e.target;  
    const { row } = pixel.dataset;
    const { col } = pixel.dataset;
    // domReceiveAttack(parentBoard, pixel, row, col);
    processClick(parentBoard, pixel, row, col);
}

function addEventListeners() {
  const pixels = document.querySelectorAll(".right-gameboard .board-cell");
  pixels.forEach((pixel) => {
    pixel.addEventListener("click", cellClick);
  });
}

  return {
    createCell,
    createBoard,
    domReceiveAttack,
    addEventListeners,
    domAI
  }
};

export default manipulateDom;