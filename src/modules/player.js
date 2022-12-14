const player = (boardSize = 7) => {
    const randomMove = () => {
        let rowTarget = Math.floor(Math.random() * boardSize);
        let colTarget = Math.floor(Math.random() * boardSize);

        return [rowTarget, colTarget];
    }
    return {
        randomMove,
    }
}

export default player;