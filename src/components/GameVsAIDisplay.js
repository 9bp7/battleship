import React, {useState, useEffect} from 'react';
import BoatPlacing from './BoatPlacing';
import GamePlaying from './GamePlaying';

function GameVsAIDisplay(props) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const boats = [{name: 'Carrier', length: 5},
  {name: 'Battleship', length: 4},
  {name: 'Destroyer', length: 3},
  {name: 'Submarine', length: 3},
  {name: 'Patrol Boat', length: 2}];
  let toDisplay = '';

  useEffect(() => {
    props.playerTwo.fillGameboard(boats);
  }, [])

  switch(currentScreen) {
    case 0:
      toDisplay = <BoatPlacing text={"Right, you're in charge Commander " + props.playerOne.getName() + "! First up, where do you want our boats?"}
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