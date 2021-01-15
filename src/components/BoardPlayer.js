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

  useEffect(() => {
    redrawBoard();
  }, [props.isEnabled])

  function redrawBoard(dx = 0, dy = 0) {
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
        
        filledBoard[y][x] = <BoardTile  onHover={() => redrawBoard(x, y)}
                                        x={x} 
                                        y={y}
                                        isOccupied={tileIsOccupied}
                                        isHit={tileIsHit} />
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