import gameboard from "../modules/gameboard";
import shipFactory from "../modules/shipFactory";

// this test is probably not needed and it gets tested extensively through the use of other tests
test("Test that the gameboard is created with a 7x7", () => {
    const board = gameboard();
    expect(board.board.length).toBe(7);
    expect(board.board[0].length).toBe(7);
});

test("Test that the gameboard can place a ship horizontally at the coordinates specified on an empty board", () => {
    const board = gameboard();
    const row = 0;
    const col = 0;
    const isVertical = false;
    expect(board.placeShip(shipFactory(3), row, col, isVertical)).toBeTruthy();
    expect(board.board[0][0]).toBeTruthy();
    expect(board.board[0][1]).toBeTruthy();
    expect(board.board[0][2]).toBeTruthy();
})

test("Test that the gameboard can place a ship vertically at the coordinates specified on an empty board", () => {
    const board = gameboard();
    const row = 0;
    const col = 0;
    const isVertical = true;
    expect(board.placeShip(shipFactory(3), row, col, isVertical)).toBeTruthy();
    expect(board.board[0][0]).toBeTruthy();
    expect(board.board[1][0]).toBeTruthy();
    expect(board.board[2][0]).toBeTruthy();
})

test("Test that the gameboard will NOT place a ship if the ship were to cross the borders of the gameboard", () => {
    const board = gameboard();
    const row = 5;
    const col = 5; // max index is 6

    // place horizontally 
    expect(board.placeShip(shipFactory(3), row, col, false)).toBe(false);

    // place vertically
    expect(board.placeShip(shipFactory(3), row, col, true)).toBe(false);
})

test("Test that the gameboard will place a ship while other ships are on the board", () => {
    const board = gameboard();

    // place a vertical ship with length of 4 at the exact center of the board
    board.placeShip(shipFactory(4), 3, 3, true);

    // try to place a ship on the top left
    expect(board.placeShip(shipFactory(2), 0, 0, true)).toBe(true);
})

test("Test that the gameboard will not place a ship if it were to collide with another ship", () => {
    const board = gameboard();

    // place a vertical ship with length of 4 at the exact center of the board
    board.placeShip(shipFactory(4), 3, 3, true);

    // try to place a ship directly on top of the ship
    expect(board.placeShip(shipFactory(2), 3, 3, true)).toBe(false);
    // try to place a ship of length 3 horizontally 2 cells to the left
    expect(board.placeShip(shipFactory(3), 3, 1, false)).toBe(false);
    // try to place a ship of length 2 vertically 1 cell above
    expect(board.placeShip(shipFactory(2), 2, 3, true)).toBe(false);
})

// Tests to exercise receiveAttack();

test("Test receiveAttack cannot be repeated on the same cell", () => {
    const board = gameboard();
    board.placeShip(shipFactory(2), 0, 0, true);

    expect(board.receiveAttack(3,3)).toBe(true);
    expect(board.receiveAttack(3,3)).toBe(false);
})

test("Test receiveAttack can hit a ship", () => {
    const board = gameboard();
    const ship = shipFactory(2);
    board.placeShip(ship, 0, 0, true);
    board.receiveAttack(0,0);
    expect(ship.damage).toBe(1);
})

test("Test receiveAttack can sink a ship", () => {
    const board = gameboard();
    const ship = shipFactory(2);

    board.placeShip(ship, 0, 0, true);
    expect(board.receiveAttack(0,0)).toBe(true);
    expect(board.receiveAttack(1,0)).toBe(true);
   
    expect(ship.damage).toBe(2);
    expect(ship.isSunk()).toBe(true);
})

// test checkGameOver 
test("Test checkGameOver returns false when a ship is not sunk", () => {
    const board = gameboard();
    const ship = shipFactory(2);

    board.placeShip(ship, 0, 0, true);
    expect(board.checkGameOver()).toBe(false);
})

test("Test checkGameOver returns true when all ships are sunk", () => {
    const board = gameboard();
    const ship = shipFactory(2);
    const ship2 = shipFactory(2);

    board.placeShip(ship, 0, 0, true);
    board.placeShip(ship2, 2, 2, true);

    board.receiveAttack(0,0);
    board.receiveAttack(1,0);
    board.receiveAttack(2,2);
    board.receiveAttack(3,2);
    
    expect(board.checkGameOver()).toBe(true);
})