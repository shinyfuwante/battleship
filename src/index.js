import gameboard from "./modules/gameboard";
import player from "./modules/player";
import manipulateDom from "./modules/manipulateDom";
import "./style.css";

const player1 = player();
const leftGB = gameboard();
const domLeftGB = document.querySelector(".left-gameboard");

const player2 = player();
const rightGB = gameboard();
const domRightGB = document.querySelector(".right-gameboard");
const DM = manipulateDom(leftGB, rightGB);

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
DM.addEventListeners();
leftGB.populateShipsRandomly();
rightGB.populateShipsRandomly();

// implement basic "ai" (just random shots);

// flex task: show what the opponent sees
