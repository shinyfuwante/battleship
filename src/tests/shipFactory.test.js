import shipFactory from "../modules/shipFactory";

test("Test that the factory returns a ship with a length of 3", () => {
  const ship = shipFactory(3);
  expect(ship.length).toEqual(3);
  expect(ship.hurtbox).toEqual([]);
  expect(ship.isSunk()).toBe(false);
});

test("Test that a ship can take damage without sinking", () => {
  const ship = shipFactory(4);
  ship.hit(3);
  expect(ship.isSunk()).toBe(false);
});

test("Test that a ship cannot be hit in the same location", () => {
  const ship = shipFactory(2);
  ship.hit(0);
  ship.hit(0);
  expect(ship.isSunk()).toBe(false);
});

test("Test that a ship will sink if hit in ship.length amount of times", () => {
    const ship = shipFactory(3);
    for (let i = 0; i < ship.length; i+=1) {
        ship.hit(i);
    }
    expect(ship.isSunk()).toBe(true);
});