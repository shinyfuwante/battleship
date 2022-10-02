const gameboard = (size = 7) => {
    const board = new Array(size).fill(new Array(size));

    function isValidPlacement (ship, row, col, isVertical) {
        // check bounds
        if (col < 0 || col > size - 1) return false;
        if (row < 0 || row > size - 1) return false;
        if (isVertical) {
            if (row + ship.length > size) return false;
        } 
        else if (col + ship.length > size) return false;
        // check if any of the cells are occupied
        if (isVertical) {
            for (let i = 0; i < ship.length; i += 1) {
                if (board[row+i][col]) return false;
            }
        } else {
            for (let i = 0; i < ship.length; i += 1) {
                if (board[row][col+i]) return false;
            }
        }
        return true;
    }
    function placeShip (ship, row, col, isVertical) {
        if (!isValidPlacement(ship, row, col, isVertical)) return false;
        if (isVertical) {
            for (let i = 0; i < ship.length; i += 1) {
                board[row+i][col] = ship;
            }
        } else {
            for (let i = 0; i < ship.length; i += 1) {
                board[row][col+i] = ship;
            }
        }
        return true;
    }
    return {
        board,
        placeShip
    }
}

export default gameboard;