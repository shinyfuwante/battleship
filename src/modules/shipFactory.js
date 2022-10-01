const shipFactory = (length) => ({
    length,
    hurtbox: [],
    isSunk () {
        return this.hurtbox.length === length;
    },
    hit (index) {
        if (this.hurtbox.includes(index)) return;
        this.hurtbox.push(index);
    }
  })

export default shipFactory;
