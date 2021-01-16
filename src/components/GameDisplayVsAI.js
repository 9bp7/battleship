import React, {useState, useEffect} from 'react';
import BoatPlacer from './BoatPlacer';
import GameLoopVsAI from './GameLoopVsAI';

function GameDisplayVsAI(props) {
  const [currentScreen, setCurrentScreen] = useState(0);
  let toDisplay = '';

  useEffect(() => {
    props.playerTwo.fillGameboard(props.boats);
  }, [])

  switch(currentScreen) {
    case 0:
      toDisplay = <BoatPlacer text={"You're in charge, Commander " + props.playerOne.getName() + "! Where shall we position our ships?"}
                               gameboard={props.playerOne.getGameboard()}
                               setScreen={() => setCurrentScreen(1)}
                               boats={props.boats}/>
      break;
    case 1: 
      toDisplay = <GameLoopVsAI playerOne={props.playerOne}
                                playerTwo={props.playerTwo} />
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

export default GameDisplayVsAI;