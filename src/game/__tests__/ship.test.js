import {Ship} from '../ship';

describe('ship logic', () => {
  let myShip;

  beforeEach(() => {
    myShip = Ship([10, 11, 12]);
  });

  test('can determine if sunk', () => {
    myShip.hit(10);
    myShip.hit(11);
    myShip.hit(12);
    expect(myShip.isSunk()).toBe(true);
  })

  test('can determine if not sunk', () => {
    myShip.hit(11);
    myShip.hit(12);
    expect(myShip.isSunk()).toBe(false);
  })

  test('can take hit, returns false if position is already hit', () => {
    myShip.hit(11);
    expect(myShip.hit(11)).toBe(false);
  })

  test('can take hit, returns true if position has not already been hit', () => {
    expect(myShip.hit(11)).toBe(true);
  })
})

