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

test("Test that the gameboard is created with a 7x7", () => {
    const board = gameboard();
    expect(board.board.length).toBe(7);
    expect(board.board[0].length).toBe(7);
});

test("Test that the gameboard can place a ship horizontally at the coordinates specified on an empty board", () => {
    const board = gameboard();
    expect(board.placeShip(shipFactory(3), 0, 0, false)).toBeTruthy();
})
  