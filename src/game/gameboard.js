import {Ship} from './ship';
import Tile from './tile';

const Gameboard = (size) => {
  let board = [];
  for(let y = 0; y < size; y++) {
    board[y] = [];
    for(let x = 0; x < size; x++) {
      board[y][x] = Tile();
    }
  }
  let allShips = [];

  const getBoardSize = () => size;

  const getTile = (x, y) => board[x][y];

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

  const positionIsLegal = (x, y, axis, length) => {
    if(positionIsOutOfBounds(
      (axis === 'x' ? x : y),
      length
    )) {
      return false;
    } else if(positionIsAlreadyTaken(x, y, axis, length)) {
      return false;
    }
    return true;
  }

  const placeShip = (x, y, axis, length, name = '') => {
    // Ensure that desired position is not out of bounds or taken already
    if(!positionIsLegal(x, y, axis, length)) {
      return false;
    }

    // If safe to place
    // Firstly, create a new Ship() and add to allShips[]
    let startPos = (axis === 'x' ? x : y);
    let tilesOccupiedByShip = [];
    for(let i = startPos; i < (startPos + length); i++) {
      tilesOccupiedByShip.push(i);
    }
    let shipToBePlaced = Ship(tilesOccupiedByShip, axis, name);
    allShips.push(shipToBePlaced);

    // Then set the relevant board tiles to be occupied with the Ship()
    for(let i = startPos; i < (startPos + length); i++) {
      if(axis === 'x') {
        board[i][y].setOccupied(true, shipToBePlaced);
      } else if(axis === 'y') {
        board[x][i].setOccupied(true, shipToBePlaced);
      }
    }

    return true;
  }

  const receiveAttack = (x, y) => {
    if(board[x][y].isHit()) {
      return 'invalid';
    } else {
      board[x][y].setHit(true);

      if(board[x][y].isOccupied()) {
        board[x][y].getOccupyingShip().hit({
          x,
          y,
        })
        return 'hit';
      } else {
        return 'miss';
      }
    }
  }

  const canReceiveAttack = (x, y) => {
    if(x < 0 || x >= size || y < 0 || y >= size) {
      return false;
    }
    
    if(board[x][y].isHit()) {
      return false;
    }
    return true;
  }

  const allShipsSunk = () => {
    for(let i = 0; i < allShips.length; i++) {
      if(!allShips[i].isSunk()) {
        return false;
      }
    }
    return true;
  }

  const getAllSunkShipCoords = () => {
    let coords = [];
    for(let x = 0; x < size; x++) {
      for(let y = 0; y < size; y++) {
        if(board[x][y].isOccupied()) {
          if(board[x][y].getOccupyingShip().isSunk()) {
            coords.push({x: x, y: y});
          }          
        }        
      }
    }
    return coords;
  }

  const getBoard = () => {
    return board;
  }

  return { placeShip, receiveAttack, canReceiveAttack, getAllSunkShipCoords, getBoard, getBoardSize, getTile, allShipsSunk, positionIsLegal }
}

export { Gameboard };