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


DM.createBoard(domLeftGB, leftGB);
DM.createBoard(domRightGB, rightGB);

// task: show location of own ships
// allow placement manual placement of ships

leftGB.populateShipsRandomly();
DM.showBoard(domLeftGB, leftGB);
rightGB.populateShipsRandomly();

// game starts here
DM.addEventListeners();


