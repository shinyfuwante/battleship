import gameboard from "./modules/gameboard"
import player from "./modules/player"
import shipFactory from "./modules/shipFactory"
import './style.css';

function createCell(size) {
    const pixel = document.createElement('div');
    pixel.style.width = `${100/size}%`; 
    pixel.style.height = `${100/size}%`; 
    pixel.classList.add('board-cell');
    return pixel;
}

const leftGB = gameboard();
const domLeftGB = document.querySelector('.left-gameboard');
// task: focus on trying to interact with the board (one board for now)

function createBoard(element, board) {
    for (let i = 0; i < board.board.length; i +=1) {
        const row = board.board[i];
        for (let j = 0; j < row.length; j += 1) {
            const cell = createCell(row.length);
            cell.dataset.row = i;
            cell.dataset.col = j;
            element.appendChild(cell);
        }
    }
}

function addEventListeners() {
    const pixels = document.querySelectorAll('.left-gameboard .board-cell')
    console.log(pixels);
    pixels.forEach(pixel => {
        pixel.addEventListener('click', (e) => {
            const {row} = pixel.dataset;
            const {col} = pixel.dataset;
            //console.log(`row: ${pixel.dataset.row} col: ${pixel.dataset.col}`);
            if (leftGB.board[row][col]) {
                console.log(`ship present at: row: ${pixel.dataset.row} col: ${pixel.dataset.col}`);
                pixel.classList.add('ship');
            } else {
                pixel.classList.add('miss');
            }
        })
    })
}

// helper function to populate ships random
function populateShipsRandomly(element, board) {
    const ships = [shipFactory(2), shipFactory(3), shipFactory(3), shipFactory(4), shipFactory(5)];

    ships.forEach(ship => {
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
createBoard(domLeftGB, leftGB);
addEventListeners();
populateShipsRandomly(domLeftGB, leftGB);
// now, each cell has a data row and data col, I can try to use this to interact with the underlying board
// that is tracking the logic
// next step is to add event listeners to fire shots (will handle placing ships later);
