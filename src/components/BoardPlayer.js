import React, {useState, useEffect} from 'react';
import BoardTile from './BoardTile';
import './Board.css';

function BoardPlayer(props) {
  let [board, setBoard] = useState([]);
  let [placed, setPlaced] = useState([]);

  // Draw board on component mount
  useEffect(() => {
    redrawBoard();
  }, [])

  function redrawBoard(x = 0, y = 0) {
    let filledBoard = [];
    for(let y = 0; y < props.gameboard.getBoardSize(); y++) {
      filledBoard[y] = [];
      for(let x = 0; x < props.gameboard.getBoardSize(); x++) { 
        if(props.gameboard.getTile(x, y).isOccupied()) {
          filledBoard[y][x] = <BoardTile onMouseOver={redrawBoard} 
                                  isOccupied x={x} y={y} />
        } else {
          filledBoard[y][x] = <BoardTile onMouseOver={redrawBoard} x={x} y={y}/>
        }
      }
    }
    setBoard([...filledBoard]);
  }
  
  /*function redrawBoard(x = 0, y = 0) {
    let filledBoard = [];
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
  }*/

  return(
    <> 
      <div className="gameboard">
        {board}
      </div>
    </>
  )
}

export default BoardPlayer;