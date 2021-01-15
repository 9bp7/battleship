import {Gameboard} from './gameboard';

const Player = (name, boardSize) => {
  const gameboard = Gameboard(boardSize);

  const getName = () => {
    return name;
  }

  const getGameboard = () => {
    return gameboard;
  }

  return { getName, getGameboard};
}

const HumanPlayer = (name, boardSize) => {
  const prototype = Player(name, boardSize);

  return Object.assign(
    {}, 
    prototype, 
    {}
  )
}

const ComputerPlayer = (name, boardSize) => {
  const prototype = Player(name, boardSize);

  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }  

  const getNextCoords = (gameboardToAttack) => {
    let coordsAreInvalid = true;
    let coords = {};
    do {
      coords.x = getRandomArbitrary(0, boardSize);
      coords.y = getRandomArbitrary(0, boardSize);
      if(gameboardToAttack.positionIsLegal(coords.x, coords.y)) {
        coordsAreInvalid = false;
      }
    } while(coordsAreInvalid);

    return coords;
  }

  return Object.assign(
    {}, 
    prototype, 
    { getNextCoords }
  )
}

export { Player, HumanPlayer, ComputerPlayer }