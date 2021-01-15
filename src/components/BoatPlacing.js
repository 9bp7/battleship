import React, {useState} from 'react';
import Board from './Board';

function BoatPlacing(props) {
  return(
    <>
      <div>
        <p className="smaller-p">{props.text}</p>
        <p className="smaller-p">Currently Placing: </p>
        <Board gameboard={props.gameboard}
               placingShipLength={5}
               placingShipAxis='x' />
      </div>
    </>
  )
}

export default BoatPlacing;