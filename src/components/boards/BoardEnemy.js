import React, {useState, useEffect} from 'react';
import BoardTile from './BoardTile';
import './Board.css';

function BoardPlayer(props) {
  let [board, setBoard] = useState([]);
  let [placed, setPlaced] = useState([]);

  useEffect(() => {
    redrawBoard();
  }, [])

  useEffect(() => {
    redrawBoard();
  }, [placed, props.isEnabled])

  function processAttack(x, y) {
    if(!props.isEnabled) {
      return;
    }

    if(props.gameboard.canReceiveAttack(x, y)) {
      setPlaced(placed + 1);
      props.gameboard.receiveAttack(x, y);
      props.receiveAttack(x, y);
    }    
  }

  let [coords, setCoords] = useState({x: 0, y: 0});

  function redrawBoard(dx = coords.x, dy = coords.y) {
    setCoords({x: dx, y: dy});

    let filledBoard = [];
    for(let y = 0; y < props.gameboard.getBoardSize(); y++) {
      filledBoard[y] = [];
      for(let x = 0; x < props.gameboard.getBoardSize(); x++) { 
        let tileIsOccupied = false;
        if(props.gameboard.getTile(x, y).isOccupied()) {
          tileIsOccupied = true;
        }
        let tileIsHit = false;
        if(props.gameboard.getTile(x, y).isHit()) {
          tileIsHit = true;
        }
        let tileIsHovering = null;
        if(dx === x && dy === y) {
          if(props.gameboard.canReceiveAttack(x, y)) {
            tileIsHovering = true;
          } else {
            tileIsHovering = false;
          }
        }
        filledBoard[y][x] = <BoardTile  onMouseOver={() => redrawBoard(x, y)}
                                        onClick={() => props.isEnabled ? processAttack(x, y) : null}
                                        x={x} 
                                        y={y}
                                        isOccupied={tileIsOccupied}
                                        isHoveringValid={tileIsHovering}
                                        isHit={tileIsHit}
                                        state="attacking"
                                        isEnemy={true} />
      }
    }
    setBoard([...filledBoard]);
  }

  return(
    <> 
      <div className="gameboard">
        {board}
      </div>
    </>
  )
}

export default BoardPlayer;