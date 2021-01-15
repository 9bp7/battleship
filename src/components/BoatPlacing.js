import React, {useState, useEffect} from 'react';
import BoardPlacingShips from './BoardPlacingShips';

function BoatPlacing(props) {
  let [boatsToPlace, setBoatsToPlace] = useState();
  let [currentBoat, setCurrentBoat] = useState(0);
  let [axis, setAxis] = useState('y');

  useEffect(() => {
    let boats = props.boats;
    setBoatsToPlace([...boats]);
  }, []);

  function placeShip(x, y) {
    if(currentBoat < boatsToPlace.length) {
      if(props.gameboard.positionIsLegal()) {
        if((currentBoat + 1) < boatsToPlace.length) {
          setCurrentBoat(currentBoat + 1);  
        } else {
          props.setScreen();
        }               
      }      
    }
  }

  return(
    <>
      <div>
        <p className="smaller-p">{props.text}</p>
        { boatsToPlace !== undefined
        ? <>
            <p className="smaller-p">Currently Placing: {boatsToPlace[currentBoat].name}</p>
            <BoardPlacingShips gameboard={props.gameboard}
                placingShipLength={boatsToPlace[currentBoat].length}
                placingShipAxis={axis} 
                shipName={boatsToPlace[currentBoat].name}
                placeShipFunc={placeShip}
                changeAxisFunc={() => axis === 'x' ? setAxis('y') : setAxis('x')}
                />
          </>
        : <p>Setting up board...</p>}
      </div>
    </>
  )
}

export default BoatPlacing;