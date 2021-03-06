import React, {useState, useEffect} from 'react';
import BoardPlacingShips from './boards/BoardPlacingShips';

function BoatPlacer(props) {
  let [boatsToPlace, setBoatsToPlace] = useState();
  let [currentBoat, setCurrentBoat] = useState(0);
  let [axis, setAxis] = useState('y');
  let [eventListener, setEventListener] = useState(false);

  useEffect(() => {
    let boats = props.boats;
    setBoatsToPlace([...boats]);

    return(() => {
      window.removeEventListener("keyup", handleSpaceKey);
      setEventListener(false);
    })
  }, []);

  function handleSpaceKey(e) {
    if(e.keyCode === 32) {
      if(axis === 'x') {
        setAxis('y');
      } else if(axis === 'y') {
        setAxis('x');
      }
      window.removeEventListener('keyup', handleSpaceKey);
      setEventListener(false);
    }  
  }

  useEffect(() => {
    if(eventListener === false) {
      setEventListener(true);
      window.addEventListener('keyup', handleSpaceKey);
    }
  }, [eventListener]);

  // If text changes, assume there is another player who needs to place boats
  // And reset the necessary variables
  useEffect(() => {
    setCurrentBoat(0);
  }, [props.text])

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

export default BoatPlacer;