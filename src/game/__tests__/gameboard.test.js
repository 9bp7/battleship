import {Gameboard} from '../gameboard';

describe('gameboard logic', () => {
  let myGameboard;

  beforeEach(() => {
    myGameboard = Gameboard(5);
  });

  test('board can determine if all ships are sunk', () => {
    myGameboard.placeShip(1, 0, 'x', 2);
    myGameboard.placeShip(1, 1, 'x', 2);
    myGameboard.receiveAttack(1, 0);
    myGameboard.receiveAttack(2, 0);
    myGameboard.receiveAttack(1, 1);
    myGameboard.receiveAttack(2, 1);
    expect(myGameboard.allShipsSunk()).toBe(true);
  })

  test('board registers hit correctly', () => {
    myGameboard.placeShip(1, 0, 'x', 3);
    expect(myGameboard.receiveAttack(1, 0)).toBe('hit');
    expect(myGameboard.getBoard()[1][0].isHit()).toBe(true);
  })

  test('returns false if tile has already been hit', () => {
    myGameboard.receiveAttack(1, 1);
    expect(myGameboard.receiveAttack(1, 1)).toBe('invalid');
  })

  test('can receive attacks', () => {
    expect(myGameboard.receiveAttack(1, 1)).toBe('miss');
  })

  test('returns false if desired vertical position is partially taken', () => {
    myGameboard.placeShip(0, 2, 'y', 3);
    expect(myGameboard.placeShip(0, 0, 'y', 3)).toBe(false);
  })

  test('returns false if desired vertical position is exactly taken', () => {
    myGameboard.placeShip(0, 0, 'y', 3);
    expect(myGameboard.placeShip(0, 0, 'y', 3)).toBe(false);
  })

  test('returns false if desired horizontal position is partially taken', () => {
    myGameboard.placeShip(2, 0, 'x', 3);
    expect(myGameboard.placeShip(0, 0, 'x', 3)).toBe(false);
  })

  test('returns false if desired horizontal position is exactly taken', () => {
    myGameboard.placeShip(0, 0, 'x', 3);
    expect(myGameboard.placeShip(0, 0, 'x', 3)).toBe(false);
  })

  test('returns false if vertical placement is out of bounds', () => {
    expect(myGameboard.placeShip(2, 3, 'y', 3)).toBe(false);
  })

  test('allows placing ships vertically', () => {
    expect(myGameboard.placeShip(0, 2, 'y', 3)).toBe(true);
  })

  test('returns false if horizontal placement is out of bounds', () => {
    expect(myGameboard.placeShip(3, 2, 'x', 3)).toBe(false);
  })

  test('allows placing ships horizontally', () => {
    expect(myGameboard.placeShip(0, 2, 'x', 3)).toBe(true);
  })
})

