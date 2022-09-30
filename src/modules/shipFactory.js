const shipFactory = (length) => ({
    length,
    hurtbox: [],
    isSunk () {
        return this.hurtbox.length === length;
    }
  })

export default shipFactory;
