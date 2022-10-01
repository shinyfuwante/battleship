const SIZE = 7;

const gameboard = () => {
    const board = new Array(SIZE).fill(new Array(SIZE));
    console.log(board.length);
    const placeShip = (ship, row, col, isVertical) => {
        const length = ship.length;
        if (isVertical) {
            // implement
        } else {
            for (let i = 0; i < length; i += 1) {
                board[row + i][col] = ship;
            }
        }
        return true;
    }
    const isValidPlacementVertical = (ship, row, col) => {
        if (col < 0 || col > SIZE - 1) return false;
        if (row < 0 || row > SIZE - 1) return false;
        if (board[row][col] === ship) return false;

        // check bounds 
        if (col + ship.length > SIZE - 1) return false;


    }
    return {
        board,
        placeShip
    }
}

export default gameboard;