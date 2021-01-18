import React, {useState, useEffect} from 'react';
import BoatPlacer from './BoatPlacer';
import GameLoopVsHuman from './GameLoopVsHuman';

function GameDisplayVsHuman(props) {
  const [currentScreen, setCurrentScreen] = useState(0);
  let toDisplay = '';

  switch(currentScreen) {
    case 0:
      toDisplay = <BoatPlacer text={"You're up first, Commander " + props.playerOne.getName() + "! Where shall we position our ships?"}
                               gameboard={props.playerOne.getGameboard()}
                               setScreen={() => setCurrentScreen(1)}
                               boats={props.boats}/>
      break;
    case 1:
      toDisplay = <BoatPlacer text={"It's your turn now, Commander " + props.playerTwo.getName() + "! Where's best to position our ships?"}
                                gameboard={props.playerTwo.getGameboard()}
                                setScreen={() => setCurrentScreen(2)}
                                boats={props.boats}/>
      break;
    case 2: 
      toDisplay = <GameLoopVsHuman playerOne={props.playerOne}
                                playerTwo={props.playerTwo}
                                globalSetScreen={props.globalSetScreen} />
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

export default GameDisplayVsHuman;