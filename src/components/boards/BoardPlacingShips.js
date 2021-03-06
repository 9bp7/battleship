import React, {useState, useEffect} from 'react';
import BoardTile from './BoardTile';
import './Board.css';

function BoardPlacingShips(props) {
  let [board, setBoard] = useState([]);
  let [placed, setPlaced] = useState([]);

  // Draw board on component mount
  useEffect(() => {
    redrawBoard();
  }, [])

  useEffect(() => {
    redrawBoard();
  }, [placed, props.placingShipAxis, props.shipName])

  function placeShip(x, y) {
    if(props.gameboard.positionIsLegal(x, y, props.placingShipAxis, props.placingShipLength)) {
      props.gameboard.placeShip(x, y, props.placingShipAxis, props.placingShipLength, props.shipName);
      setPlaced(placed + 1);
      props.placeShipFunc(x, y);
    }
  }

  let [coords, setCoords] = useState({x: 0, y: 0});

  function redrawBoard(x = coords.x, y = coords.y) {
    setCoords({x, y});
    
    let filledBoard = [];

    // Firstly, draw the board and any occupied tiles
    for(let y = 0; y < props.gameboard.getBoardSize(); y++) {
      filledBoard[y] = [];
      for(let x = 0; x < props.gameboard.getBoardSize(); x++) { 
        let tileIsOccupied = false;
        if(props.gameboard.getTile(x, y).isOccupied()) {
          tileIsOccupied = true;
        }
        filledBoard[y][x] = <BoardTile  onClick={() => placeShip(x, y)} 
                                        onMouseOver={() => redrawBoard(x, y)} 
                                        x={x} 
                                        y={y}
                                        isOccupied={tileIsOccupied}
                                        isHoveringValid={null}
                                        state={"placing"} />
      }
    }

    // Then, draw the current location of where the boat will be placed
    // Set flags depending on whether the position is legal or not
    let startPos = (props.placingShipAxis === 'x' ? x : y);
    for(let i = startPos; i < (startPos + props.placingShipLength); i++) {
      if(startPos <= props.gameboard.getBoardSize()) {
        let isTilePositionValid = ( props.gameboard.positionIsLegal(x, y, props.placingShipAxis, props.placingShipLength)
                                    ? true
                                    : false);
        let xx = 0, yy = 0;
        if(props.placingShipAxis === 'x') {
          xx = i;
          yy = y;
        } else if(props.placingShipAxis === 'y') {
          xx = x;
          yy = i;
        }

        if(xx < props.gameboard.getBoardSize() && yy < props.gameboard.getBoardSize()) {
          filledBoard[yy][xx] = <BoardTile  onClick={() => placeShip(xx, yy)} 
                                            onMouseOver={() => redrawBoard(xx, yy)} 
                                            x={xx} 
                                            y={yy} 
                                            isOccupied={props.gameboard.getTile(xx, yy).isOccupied()} 
                                            isHoveringValid={isTilePositionValid}
                                            state={"placing"} />
        }
      }
    }
    
    setBoard([...filledBoard]);
  }

  return(
    <> 
      <div className="gameboard">
        <div className="gameboard-placing-controls">
          <p className="coords">Axis: {props.placingShipAxis} Coords: {coords.x} {coords.y} </p>
          <button onClick={props.changeAxisFunc} onWheel={props.changeAxisFunc}>Change Axis</button>
          <p className="smaller-p">Or press Space to Change Axis</p>
        </div>
        
         {board}
      </div>
    </>
  )
}

export default BoardPlacingShips;