import React, {useState, useEffect} from 'react';
import BoardTile from './BoardTile';
import './Board.css';

function Board(props) {
  let [board, setBoard] = useState([]);

  props.gameboard.placeShip(2, 3, 'x', 3);

  useEffect(() => {
    redrawBoard();
  }, [])

  let [coords, setCoords] = useState({x: 0, y: 0});
  
  function redrawBoard(x, y) {
    setCoords({x, y});

    let filledBoard = [];
    for(let y = 0; y < props.gameboard.getBoardSize(); y++) {
      filledBoard[y] = [];
      for(let x = 0; x < props.gameboard.getBoardSize(); x++) { 
        if(props.gameboard.getTile(x, y).isOccupied()) {
          filledBoard[y][x] = <BoardTile onMouseOver={redrawBoard} 
                                  isOccupied x={x} y={y}/>
        } else {
          filledBoard[y][x] = <BoardTile onMouseOver={redrawBoard} x={x} y={y} />
        }
      }
    }

    if(props.placingShipAxis === 'x') {
      for(let i = x; i < (x + props.placingShipLength); i++) {
        if((x + props.placingShipLength) <= props.gameboard.getBoardSize()) {
          if(props.gameboard.positionIsLegal(x, y, props.placingShipAxis, props.placingShipLength)) {
            filledBoard[y][i] = <BoardTile onMouseOver={redrawBoard} x={i} y={y} isOccupied={props.gameboard.getTile(i, y).isOccupied()} isHoveringValid />
          } else {
            filledBoard[y][i] = <BoardTile onMouseOver={redrawBoard} x={i} y={y} isOccupied={props.gameboard.getTile(i, y).isOccupied()} isHoveringInvalid />
          }
          
        }
      }
    }
    
    setBoard([...filledBoard]);
  }

  return(
    <> 
      <p>{coords.x} {coords.y}</p>
      <div className="gameboard">
         {board}
      </div>
    </>
  )
}

export default Board;