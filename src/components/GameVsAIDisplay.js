import React, {useState} from 'react';
import BoatPlacing from './BoatPlacing';

function GameVsAIDisplay(props) {
  const [currentScreen, setCurrentScreen] = useState(0);
  let toDisplay = '';

  switch(currentScreen) {
    case 0:
      toDisplay = <BoatPlacing text={"Right, you're in charge Commander " + props.playerOne.getName() + "! First up, where do you want our boats?"}
                               gameboard={props.playerOne.getGameboard()}/>
      break;
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