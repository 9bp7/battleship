import {Ship} from './ship';

const Tile = () => {
  let hit = false;
  let occupied = false;
  let occupyingShip = null;

  const setHit = (isHit) => hit = isHit;
  const isHit = () => {
    return hit;
  }

  const setOccupied = (isOccupied, ship) => {
    occupied = isOccupied;
    occupyingShip = ship;
  };
  const isOccupied = () => {
    return occupied;
  };
  const getOccupyingShip = () => {
    return occupyingShip;
  }

  return { setHit, isHit, setOccupied, isOccupied, getOccupyingShip }
}

const Gameboard = (size) => {
  let board = [];
  for(let x = 0; x < size; x++) {
    board[x] = [];
    for(let y = 0; y < size; y++) {
      board[x][y] = Tile();
    }
  }

  const positionIsOutOfBounds = (startPos, length) => {
    if((startPos + length) > size) {
      return true;
    }
    return false;
  }

  const positionIsAlreadyTaken = (x, y, axis, length) => {
    if(axis === 'x') {
      for(let i = x; i < (x + length); i++) {
        if(board[i][y].isOccupied()) {
          return true;
        }
      }
    } else if(axis === 'y') {
      for(let i = y; i < (y + length); i++) {
        if(board[x][i].isOccupied()) {
          return true;
        }
      }
    }
    return false;
  }

  const placeShip = (x, y, axis, length) => {
    // Ensure that desired position is not out of bounds or taken already
    if(positionIsOutOfBounds(
      (axis === 'x' ? x : y),
      length
    ) || positionIsAlreadyTaken(x, y, axis, length)) {
      return false;
    }

    // If safe, proceed to placing the ship
    // First get the tiles occupied by the ship so we can create a Ship()
    let startPos = (axis === 'x' ? x : y);
    let tilesOccupiedByShip = [];
    for(let i = startPos; i < (startPos + length); i++) {
      tilesOccupiedByShip.push(i);
    }
    let shipToBePlaced = Ship(tilesOccupiedByShip);

    if(axis === 'x') {
      for(let i = x; i < (x + length); i++) {
        board[i][y].setOccupied(true, shipToBePlaced);
      }
    } else if(axis === 'y') {
      for(let i = y; i < (y + length); i++) {
        board[x][i].setOccupied(true, shipToBePlaced);
      }
    }

    return true;
  }

  return { placeShip }
}

export { Gameboard };