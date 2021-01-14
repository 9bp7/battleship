import React, {useState} from 'react';
import Gameboard from './Gameboard';

function Display(props) {
  return(
    <>
      <h2>Battleship</h2>
      <div>
        <p className="smaller-p">Right, you're in charge Commander {props.p1Name}! First up, where do you want our boats?</p>
      </div>
    </>
  )
}

export default Display;