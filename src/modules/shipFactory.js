const shipFactory = (length) => ({
    length,
    damage: 0,
    isSunk () {
        return this.damage === length;
    },
    hit () {
        this.damage += 1;
    }
  })

export default shipFactory;
