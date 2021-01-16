import React, {useState, useEffect} from 'react';
import BoatPlacing from './BoatPlacing';
import GamePlaying from './GamePlaying';

function GameVsAIDisplay(props) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const boats = [{name: 'Carrier', length: 5},
  {name: 'Battleship', length: 4},
  {name: 'Submarine', length: 3},
  {name: 'Cruiser', length: 3},
  {name: 'Destroyer', length: 2}];
  let toDisplay = '';

  useEffect(() => {
    props.playerTwo.fillGameboard(boats);
  }, [])

  switch(currentScreen) {
    case 0:
      toDisplay = <BoatPlacing text={"You're in charge, Commander " + props.playerOne.getName() + "! Where shall we position our ships?"}
                               gameboard={props.playerOne.getGameboard()}
                               setScreen={() => setCurrentScreen(1)}
                               boats={boats}/>
      break;
    case 1: 
      toDisplay = <GamePlaying playerOne={props.playerOne}
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

export default GameVsAIDisplay;