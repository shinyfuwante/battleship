import shipFactory from "../modules/shipFactory";

test("Test that the factory returns a ship with a length of 3", () => {
    const ship = shipFactory(3);
  expect(ship.length).toEqual(3);
  expect(ship.hurtbox).toEqual([]);
  expect(ship.isSunk()).toBe(false);
});
