import {Ship} from '../ship';

describe('ship logic', () => {
  let myShip;

  beforeEach(() => {
    myShip = Ship([10, 11, 12], 'x');
  });

  test('can determine if sunk', () => {
    myShip.hit({
      x: 10,
      y: 3,
    });
    myShip.hit({
      x: 11,
      y: 3,
    });
    myShip.hit({
      x: 12,
      y: 3,
    });
    expect(myShip.isSunk()).toBe(true);
  })

  test('can determine if not sunk', () => {
    myShip.hit({
      x: 11,
      y: 3,
    });
    myShip.hit({
      x: 12,
      y: 3,
    });
    expect(myShip.isSunk()).toBe(false);
  })

  test('can take hit, returns false if position is already hit', () => {
    myShip.hit({
      x: 11,
      y: 3,
    });
    expect(myShip.hit({
      x: 11,
      y: 3,
    })).toBe(false);
  })

  test('can take hit, returns true if position has not already been hit', () => {
    expect(myShip.hit({
      x: 11,
      y: 3,
    })).toBe(true);
  })
})

