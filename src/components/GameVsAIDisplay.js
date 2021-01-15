import React, {useState} from 'react';
import BoatPlacing from './BoatPlacing';
import GamePlaying from './GamePlaying';

function GameVsAIDisplay(props) {
  const [currentScreen, setCurrentScreen] = useState(0);
  let toDisplay = '';

  switch(currentScreen) {
    case 0:
      toDisplay = <BoatPlacing text={"Right, you're in charge Commander " + props.playerOne.getName() + "! First up, where do you want our boats?"}
                               gameboard={props.playerOne.getGameboard()}
                               setScreen={() => setCurrentScreen(1)}/>
      break;
    case 1: 
      toDisplay = <GamePlaying gameboardP1={props.playerOne.getGameboard()}
                               gameboardP2={props.playerTwo.getGameboard()} />
    default:
      break;
  }

  return(
    <>
      <div>
        {toDisplay}
      </div>
    </>
  )
}

export default GameVsAIDisplay;