import gameboard from "./modules/gameboard";
import player from "./modules/player";
import shipFactory from "./modules/shipFactory";
import "./style.css";

function createCell(size) {
  const pixel = document.createElement("div");
  pixel.style.width = `${100 / size}%`;
  pixel.style.height = `${100 / size}%`;
  pixel.classList.add("board-cell");
  return pixel;
}

const player1 = player();
const leftGB = gameboard();
const domLeftGB = document.querySelector(".left-gameboard");

const player2 = player();
const rightGB = gameboard();
const domRightGB = document.querySelector(".right-gameboard");

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
          console.log(
            `ship present at: row: ${row} col: ${col}`
          );
          pixel.classList.add("ship");
          if (ship.isSunk()) {
            console.log("ship sunk");
          }
        } else {
          pixel.classList.add("miss");
        }
      } else {
        console.log("attack did not succeed");
      }
    
      // check for game over
      if (board.checkGameOver()) {
        alert('game over');
      }
}

function cellClick(e) {
    // get the parent gameboard element
    // technically you should only click the right gameboard... 

    let parentBoard;
    if (e.path[1] === domLeftGB) {
        parentBoard = leftGB;
    } else {
        parentBoard = rightGB;
    }
    const pixel = e.target;  
    const { row } = pixel.dataset;
    const { col } = pixel.dataset;
    domReceiveAttack(parentBoard, pixel, row, col);
  }

function addEventListeners() {
  const pixels = document.querySelectorAll(".board-cell");
  pixels.forEach((pixel) => {
    pixel.addEventListener("click", cellClick);
  });
}

// helper function to populate ships random
function populateShipsRandomly(board) {
  const ships = [
    shipFactory(2),
    shipFactory(3),
    shipFactory(3),
    shipFactory(4),
    shipFactory(5),
  ];
  const coords = [
    [0, 0],
    [5, 0],
    [4, 5],
    [4, 0],
    [0, 2],
  ];
  ships.forEach((ship) => {
    let randX = Math.floor(Math.random() * board.board[0].length);
    let randY = Math.floor(Math.random() * board.board[0].length);
    const isVertical = Math.floor(Math.random() * 2);
    while (!board.placeShip(ship, randX, randY, isVertical)) {
      randX = Math.floor(Math.random() * board.board[0].length);
      randY = Math.floor(Math.random() * board.board[0].length);
    }
    console.log(`row: ${randX}, col: ${randY}`);
  });
}

function domAI(player, board) {
    const domBoard = board === leftGB ? domLeftGB : domRightGB;
    const [row, col] = player.randomMove();
    const pixelList = Array.from(domBoard.childNodes);
    // need to parseInt because dataset.row is a string. Add a radix of 10 for decimal numbers.
    const targetPixel = pixelList.filter((pixel) => parseInt(pixel.dataset.row, 10) === row && parseInt(pixel.dataset.col, 10) === col);
    // attack the target pixel
    domReceiveAttack(board, targetPixel[0], row, col);
}

const testButton = document.querySelector('button');
testButton.addEventListener('click', () => domAI(player2, leftGB))

createBoard(domLeftGB, leftGB);
createBoard(domRightGB, rightGB);
addEventListeners();
populateShipsRandomly(leftGB);
populateShipsRandomly(rightGB);

// implement basic "ai" (just random shots);

// flex task: show what the opponent sees
