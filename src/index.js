import gameboard from "./modules/gameboard";
import player from "./modules/player";
import shipFactory from "./modules/shipFactory";
import manipulateDom from "./modules/manipulateDom";
import "./style.css";

const DM = manipulateDom();
const player1 = player();
const leftGB = gameboard();
const domLeftGB = document.querySelector(".left-gameboard");

const player2 = player();
const rightGB = gameboard();
const domRightGB = document.querySelector(".right-gameboard");

function cellClick(e) {
    // TODO: CHANGE TO ONLY LET CLICK RIGHT SIDE 
    let parentBoard;
    if (e.path[1] === domLeftGB) {
        parentBoard = leftGB;
    } else {
        parentBoard = rightGB;
    }
    const pixel = e.target;  
    const { row } = pixel.dataset;
    const { col } = pixel.dataset;
    DM.domReceiveAttack(parentBoard, pixel, row, col);
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
    const pixelList = Array.from(domBoard.childNodes);
    // need to parseInt because dataset.row is a string. Add a radix of 10 for decimal numbers.
    let attackSuccess = false;
    while (attackSuccess === false) {
        const [row, col] = player.randomMove();
        const targetPixel = pixelList.filter((pixel) => parseInt(pixel.dataset.row, 10) === row && parseInt(pixel.dataset.col, 10) === col);
        attackSuccess = DM.domReceiveAttack(board, targetPixel[0], row, col);
    };
}

const testButton = document.querySelector('button');
testButton.addEventListener('click', () => domAI(player2, leftGB))

DM.createBoard(domLeftGB, leftGB);
DM.createBoard(domRightGB, rightGB);
addEventListeners();
populateShipsRandomly(leftGB);
populateShipsRandomly(rightGB);

// implement basic "ai" (just random shots);

// flex task: show what the opponent sees
