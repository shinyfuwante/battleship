import gameboard from "../modules/gameboard";

// mocking ship factory function in case the implementation changes from actual shipFactory.
const shipFactory = jest.fn(x => ({ 
    length: x,
    hurtbox: [],
    isSunk () {
        return this.hurtbox.length === this.length;
    },
    hit (index) {
        this.hurtbox.push(index)
    },
}));

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
    expect(board.placeShip(shipFactory(4), 3, 3, true)).toBe(true);

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