import React, {useState} from 'react';
import {HumanPlayer, ComputerPlayer} from '../game/player';
import GameDisplayVsAI from './GameDisplayVsAI';
import GameDisplayVsHuman from './GameDisplayVsHuman';

function GameDisplayRouter(props) {
  const boats = [{name: 'Carrier', length: 5},
  {name: 'Battleship', length: 4},
  {name: 'Submarine', length: 3},
  {name: 'Cruiser', length: 3},
  {name: 'Destroyer', length: 2}];

  let gameModeToDisplay;
  let playerOne = HumanPlayer(props.p1Name, 10);
  let playerTwo;
  if(props.opponent === 'ai') {
    playerTwo = ComputerPlayer(props.p2Name, 10);
    gameModeToDisplay = <GameDisplayVsAI 
                         playerOne={playerOne} 
                         playerTwo={playerTwo}
                         boats={boats}
                         globalSetScreen={props.globalSetScreen}/>
  } else {
    playerTwo = HumanPlayer(props.p2Name, 10);
    gameModeToDisplay = <GameDisplayVsHuman
                          playerOne={playerOne} 
                          playerTwo={playerTwo}
                          boats={boats}
                          globalSetScreen={props.globalSetScreen} />
  }

  return(
    <>
      {gameModeToDisplay}
    </>
  )
}

export default GameDisplayRouter;