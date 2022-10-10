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

const testButton = document.querySelector('button');
testButton.addEventListener('click', () => manipulateDom.domAI(player2, leftGB))

DM.createBoard(domLeftGB, leftGB);
DM.createBoard(domRightGB, rightGB);

leftGB.populateShipsRandomly();
rightGB.populateShipsRandomly();

DM.addEventListeners();

// implement basic "ai" (just random shots);

// flex task: show what the opponent sees
