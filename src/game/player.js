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
  let lastSuccessfulX = null;
  let lastSuccessfulY = null;
  let successDirection = null;

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
      try {
        if(prototype.gameboard.positionIsLegal(randomX, randomY, axis, shipsToFillWith[i].length)) {
          console.log('position is legal');
          prototype.gameboard.placeShip(randomX, randomY, axis, shipsToFillWith[i].length, shipsToFillWith[i].name);
          i++;
        }
      } catch(e) {
        console.log(e);
      }
    }
  }

  const makeRandomAttack = (gameboardToAttack) => {
    console.log('Attempting random attack...');

    let coordsAreInvalid = true;
    let randomX = 0;
    let randomY = 0;
    do {
      randomX = +(getRandomArbitrary(0, boardSize).toFixed(0));
      randomY = +(getRandomArbitrary(0, boardSize).toFixed(0));
      try {
        if(gameboardToAttack.canReceiveAttack(randomX, randomY)) {
          gameboardToAttack.receiveAttack(randomX, randomY);
          if(gameboardToAttack.getTile(randomX, randomY).isOccupied()) {
            lastSuccessfulX = randomX;
            lastSuccessfulY = randomY;
          }
          coordsAreInvalid = false;
        }
      } catch {
        
      }
      
    } while(coordsAreInvalid);

    return {
      x: randomX,
      y: randomY
    }
  }

  const makeCalculatedAttack = (gameboardToAttack) => {
    console.log('Attempting calculated attack...');
    if(gameboardToAttack.canReceiveAttack(lastSuccessfulX + 1, lastSuccessfulY)) {
      console.log('Trying lastScuessfuklX+1...');
      gameboardToAttack.receiveAttack(lastSuccessfulX + 1, lastSuccessfulY);
      if(gameboardToAttack.getTile(lastSuccessfulX + 1, lastSuccessfulY).isOccupied()) {
        lastSuccessfulX = lastSuccessfulX + 1;
        lastSuccessfulY = lastSuccessfulY;
      }
      return {
        x: lastSuccessfulX,
        y: lastSuccessfulY
      };
    } else if(gameboardToAttack.canReceiveAttack(lastSuccessfulX - 1, lastSuccessfulY)) {
      console.log('Trying lastScuessfuklX-1...');
      gameboardToAttack.receiveAttack(lastSuccessfulX - 1, lastSuccessfulY);
      if(gameboardToAttack.getTile(lastSuccessfulX - 1, lastSuccessfulY).isOccupied()) {
        lastSuccessfulX = lastSuccessfulX - 1;
        lastSuccessfulY = lastSuccessfulY;
      }
      return {
        x: lastSuccessfulX,
        y: lastSuccessfulY
      };
    } else if(gameboardToAttack.canReceiveAttack(lastSuccessfulX, lastSuccessfulY + 1)) {
      console.log('Trying lastScuessfuklY+1...');
      gameboardToAttack.receiveAttack(lastSuccessfulX, lastSuccessfulY + 1);
      if(gameboardToAttack.getTile(lastSuccessfulX, lastSuccessfulY + 1).isOccupied()) {
        lastSuccessfulX = lastSuccessfulX;
        lastSuccessfulY = lastSuccessfulY + 1;
      }
      return {
        x: lastSuccessfulX,
        y: lastSuccessfulY
      };
    } else if(gameboardToAttack.canReceiveAttack(lastSuccessfulX, lastSuccessfulY - 1)) {
      console.log('Trying lastScuessfuklY-1...');
      gameboardToAttack.receiveAttack(lastSuccessfulX, lastSuccessfulY - 1);
      if(gameboardToAttack.getTile(lastSuccessfulX, lastSuccessfulY - 1).isOccupied()) {
        lastSuccessfulX = lastSuccessfulX;
        lastSuccessfulY = lastSuccessfulY - 1;
      }
      return {
        x: lastSuccessfulX,
        y: lastSuccessfulY
      };
    } else {
      lastSuccessfulX = null;
      lastSuccessfulY = null;
      return makeRandomAttack(gameboardToAttack);
    }
  }

  const attackGameboard = (gameboardToAttack) => {
    let coords = {};
    if(lastSuccessfulX !== null && lastSuccessfulY !== null) {
      coords = makeCalculatedAttack(gameboardToAttack);      
    } else {
      coords = makeRandomAttack(gameboardToAttack);
    }
    return coords;
  }

  return Object.assign(
    {}, 
    prototype, 
    { attackGameboard, fillGameboard }
  )
}

export { Player, HumanPlayer, ComputerPlayer }