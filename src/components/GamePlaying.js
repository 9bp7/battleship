import React, {useState} from 'react';
import BoardPlayer from './BoardPlayer';
import BoardEnemy from './BoardEnemy';

function GamePlaying(props) {
  

  return(
    <>
      <p>Let's beat these fuckers!</p>
      <div className="half">
        <BoardPlayer gameboard={props.gameboardP1}/>
      </div>
      <div className="half">
        
      </div>
    </>
  )
}

export default GamePlaying;