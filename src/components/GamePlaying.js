import React, {useState} from 'react';
import BoardPlayer from './BoardPlayer';
import BoardEnemy from './BoardEnemy';

function GamePlaying(props) {
  

  return(
    <>
      <p>Let's beat these fuckers!</p>
      <div className="half">
        <BoardPlayer gameboard={props.playerOne.getGameboard()}/>
        <p className="white">Commander {props.playerOne.getName()}</p>
      </div>
      <div className="half">
        <BoardEnemy gameboard={props.playerTwo.getGameboard()}/>
        <p className="white">Commander Puter</p>
      </div>
    </>
  )
}

export default GamePlaying;