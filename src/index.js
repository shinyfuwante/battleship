import gameboard from "./modules/gameboard";
import manipulateDom from "./modules/manipulateDom";
import "./style.css";

const leftGB = gameboard();
const domLeftGB = document.querySelector(".left-gameboard");

const rightGB = gameboard();
const domRightGB = document.querySelector(".right-gameboard");
const DM = manipulateDom(leftGB, rightGB);


DM.createBoard(domLeftGB, leftGB);
DM.createBoard(domRightGB, rightGB);

// improvement: allow placement manual placement of ships

leftGB.populateShipsRandomly();
DM.showBoard(domLeftGB, leftGB);
rightGB.populateShipsRandomly();

// game starts here
DM.addEventListeners();


