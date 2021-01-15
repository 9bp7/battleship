import {Gameboard} from './gameboard';

const Player = (name, boardSize) => {
  const gameboard = Gameboard(boardSize);

  const getName = () => {
    return name;
  }

  const getGameboard = () => {
    return gameboard;
  }

  return { gameboard, getName, getGameboard};
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

  const fillGameboard = (shipsToFillWith) => {
    let i = 0;
    while(i < shipsToFillWith.length) {
      let axis = (getRandomArbitrary(0, 50) > 24 ? 'x' : 'y');
      let randomX = +(getRandomArbitrary(0, boardSize).toFixed(0));
      let randomY = +(getRandomArbitrary(0, boardSize).toFixed(0));
      console.log(randomX +' '+ randomY+' '+axis);
      if(prototype.gameboard.positionIsLegal(randomX, randomY, axis, shipsToFillWith[i].length)) {
        console.log('position is legal');
        prototype.gameboard.placeShip(randomX, randomY, axis, shipsToFillWith[i].length, shipsToFillWith[0].name);
        i++;
      }
      /*if(prototype.gameboard.positionIsLegal(randomX, randomY, axis, shipsToFillWith[i].length)) {
        prototype.gameboard.placeShip(randomX, randomY, axis, shipsToFillWith[i].length, shipsToFillWith[0].name);
        i++;
      }*/
    }
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
    { getNextCoords, fillGameboard }
  )
}

export { Player, HumanPlayer, ComputerPlayer }