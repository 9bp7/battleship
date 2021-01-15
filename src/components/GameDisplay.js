import React, {useState} from 'react';
import {HumanPlayer, ComputerPlayer} from '../game/player';
import GameVsAIDisplay from './GameVsAIDisplay';

function GameDisplay(props) {
  let gameModeToDisplay;
  let playerOne = HumanPlayer(props.p1Name, 10);
  let playerTwo;
  if(props.opponent === 'ai') {
    playerTwo = ComputerPlayer(props.p2Name, 10);
    gameModeToDisplay = <GameVsAIDisplay 
                         playerOne={playerOne} 
                         playerTwo={playerTwo} />
  } else {
    playerTwo = HumanPlayer(props.p2Name, 10);
    //gameModeToDisplay = <GameVsPlayerDisplay />
  }

  return(
    <>
      {gameModeToDisplay}
    </>
  )
}

export default GameDisplay;