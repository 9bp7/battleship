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
  let successfulCoordinates = [];
  let lastSuccessfulDirection = null;

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

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  const shuffleThenPrioritiseDirection = (coordsToShuffle, directionToPrioritise) => {
    let prioritisedCoords = shuffle(coordsToShuffle);
    if(directionToPrioritise !== null) {
      let coordsToPrioritise = prioritisedCoords.filter(coords => coords.direction === directionToPrioritise);
      prioritisedCoords = prioritisedCoords.filter(coords => coords.direction !== directionToPrioritise);
      prioritisedCoords.unshift(coordsToPrioritise[0]);
      console.log(prioritisedCoords);
    }    
    return prioritisedCoords;
  }

  const makeRandomAttack = (gameboardToAttack) => {
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
            successfulCoordinates.push({x: randomX, y: randomY});
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
    for(let j = 0; j < successfulCoordinates.length; j++) {
      let coordsToTry = shuffleThenPrioritiseDirection([
        {x: successfulCoordinates[j].x + 1, y: successfulCoordinates[j].y,      direction: 'right'},
        {x: successfulCoordinates[j].x - 1, y: successfulCoordinates[j].y,      direction: 'left'},
        {x: successfulCoordinates[j].x,     y: successfulCoordinates[j].y + 1,  direction: 'down'},
        {x: successfulCoordinates[j].x,     y: successfulCoordinates[j].y - 1,  direction: 'up'},
      ], lastSuccessfulDirection);

      // Try two of the values in coordsToTry
      // By trying half of the total values, we allow the computer to still make random attacks
      // This should give the computer more chance of winning
      for(let i = 0; i < (coordsToTry.length / 2); i++) {
        if(gameboardToAttack.canReceiveAttack(coordsToTry[i].x, coordsToTry[i].y)) {
          gameboardToAttack.receiveAttack(coordsToTry[i].x, coordsToTry[i].y);
          if(gameboardToAttack.getTile(coordsToTry[i].x, coordsToTry[i].y).isOccupied()) {
            successfulCoordinates.push({x: coordsToTry[i].x, y: coordsToTry[i].y});
            lastSuccessfulDirection = coordsToTry[i].direction;
          } else {
            lastSuccessfulDirection = null;
          }
  
          return {
            x: coordsToTry[i].x,
            y: coordsToTry[i].y
          };
        }
      }
    }

    // If unable to make a calculated attack, make a random attack and return the results
    return makeRandomAttack(gameboardToAttack);
  }

  const attackGameboard = (gameboardToAttack) => {
    let coords = {};
    if(successfulCoordinates.length > 0) {
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