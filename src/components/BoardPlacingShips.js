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
  }, [placed, props.placingShipAxis])

  function placeShip(x, y) {
    if(props.gameboard.positionIsLegal(x, y, props.placingShipAxis, props.placingShipLength)) {
      props.gameboard.placeShip(x, y, props.placingShipAxis, props.placingShipLength, props.shipName);
      setPlaced(placed + 1);
      props.placeShipFunc(x, y);
    }
  }

  let [coords, setCoords] = useState({x: 0, y: 0});
  
  function redrawBoard(x = 0, y = 0) {
    setCoords({x, y});

    let filledBoard = [];
    for(let y = 0; y < props.gameboard.getBoardSize(); y++) {
      filledBoard[y] = [];
      for(let x = 0; x < props.gameboard.getBoardSize(); x++) { 
        let tileIsOccupied = false;
        if(props.gameboard.getTile(x, y).isOccupied()) {
          tileIsOccupied = true;
        }
        filledBoard[y][x] = <BoardTile  onClick={() => placeShip(x, y)} 
                                        onMouseOver={redrawBoard} 
                                        isOccupied={tileIsOccupied} 
                                        x={x} 
                                        y={y} />
      }
    }


    for(let y = 0; y < props.gameboard.getBoardSize(); y++) {
      filledBoard[y] = [];
      for(let x = 0; x < props.gameboard.getBoardSize(); x++) { 
        if(props.gameboard.getTile(x, y).isOccupied()) {
          filledBoard[y][x] = <BoardTile onClick={() => placeShip(x, y)} onMouseOver={redrawBoard} 
                                  isOccupied x={x} y={y} />
        } else {
          filledBoard[y][x] = <BoardTile onClick={() => placeShip(x, y)} onMouseOver={redrawBoard} x={x} y={y}/>
        }
      }
    }

    if(props.placingShipAxis === 'x') {
      for(let i = x; i < (x + props.placingShipLength); i++) {
        if((x + props.placingShipLength) <= props.gameboard.getBoardSize()) {
          if(props.gameboard.positionIsLegal(x, y, props.placingShipAxis, props.placingShipLength)) {
            filledBoard[y][i] = <BoardTile onClick={() => placeShip(x, y)} onMouseOver={redrawBoard} x={i} y={y} isOccupied={props.gameboard.getTile(i, y).isOccupied()} isHoveringValid />
          } else {
            filledBoard[y][i] = <BoardTile onClick={() => placeShip(x, y)} onMouseOver={redrawBoard} x={i} y={y} isOccupied={props.gameboard.getTile(i, y).isOccupied()} isHoveringInvalid />
          }
        }
      }
    } else if(props.placingShipAxis === 'y') {
      for(let i = y; i < (y + props.placingShipLength); i++) {
        if((y + props.placingShipLength) <= props.gameboard.getBoardSize()) {
          if(props.gameboard.positionIsLegal(x, y, props.placingShipAxis, props.placingShipLength)) {
            filledBoard[i][x] = <BoardTile onClick={() => placeShip(x, y)} onMouseOver={redrawBoard} x={x} y={i} isOccupied={props.gameboard.getTile(x, i).isOccupied()} isHoveringValid />
          } else {
            filledBoard[i][x] = <BoardTile onClick={() => placeShip(x, y)} onMouseOver={redrawBoard} x={x} y={i} isOccupied={props.gameboard.getTile(x, i).isOccupied()} isHoveringInvalid />
          }
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
          <button onClick={props.changeAxisFunc}>Change Axis</button>
        </div>
        
         {board}
      </div>
    </>
  )
}

export default BoardPlacingShips;