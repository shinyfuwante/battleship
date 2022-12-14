import shipFactory from "./shipFactory";

const gameboard = (size = 7) => {
  const board = Array.from(new Array(size), (x) => new Array(size));
  // track shots on board
  const shots = Array.from(new Array(size), (x) => new Array(size));
  // track number of ships on board
  let ships = [];

  function isValidPlacement(ship, row, col, isVertical) {
    // check bounds
    if (col < 0 || col > size - 1) return false;
    if (row < 0 || row > size - 1) return false;
    if (isVertical) {
      if (row + ship.length > size) return false;
    } else if (col + ship.length > size) return false;
    // check if any of the cells are occupied
    if (isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        if (board[row + i][col]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        if (board[row][col + i]) return false;
      }
    }
    return true;
  }
  function placeShip(ship, row, col, isVertical) {
    if (!isValidPlacement(ship, row, col, isVertical)) return false;
    if (isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        board[row + i][col] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        board[row][col + i] = ship;
      }
    }
    ships.push(ship);
    return true;
  }

  function receiveAttack(row, col) {
    if (row < 0 || row > size - 1) return false;
    if (col < 0 || col > size - 1) return false;

    if (shots[row][col] != null) return false;
    if (board[row][col]) {
      // process the ship that was hit
      board[row][col].hit();
      // update shots board
      shots[row][col] = true;
    } else {
      shots[row][col] = false;
    }
    return true;
  }
  function checkGameOver() {
    const isSunk = (ship) => ship.isSunk();
    return ships.every(isSunk);
  }
  // helper function to populate ships random
  function populateShipsRandomly() {
    const shipsToPlace = [
      shipFactory(2),
      shipFactory(3),
      shipFactory(3),
      shipFactory(4),
      shipFactory(5),
    ];
    shipsToPlace.forEach((ship) => {
      let randX = Math.floor(Math.random() * board[0].length);
      let randY = Math.floor(Math.random() * board[0].length);
      const isVertical = Math.floor(Math.random() * 2);
      while (!placeShip(ship, randX, randY, isVertical)) {
        randX = Math.floor(Math.random() * board.length);
        randY = Math.floor(Math.random() * board.length);
      }
      console.log(`row: ${randX}, col: ${randY}`);
    });
  }
  const randomMove = () => {
    const rowTarget = Math.floor(Math.random() * size);
    const colTarget = Math.floor(Math.random() * size);

    return [rowTarget, colTarget];
  };
  return {
    board,
    placeShip,
    receiveAttack,
    checkGameOver,
    populateShipsRandomly,
    randomMove
  };
};

export default gameboard;
