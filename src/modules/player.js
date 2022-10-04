const player = (boardSize = 7) => {
    const randomMove = (gameboard) => {
        let rowTarget = Math.floor(Math.random() * boardSize);
        let colTarget = Math.floor(Math.random() * boardSize);

        // intention is to target enemy board, not our own.
        while (!gameboard.receiveAttack(rowTarget, colTarget)) {
            rowTarget = Math.floor(Math.random() * boardSize);
            colTarget = Math.floor(Math.random() * boardSize);
        }
    }
    return {
        randomMove,
    }
}

export default player;