import React, {useState} from 'react';

function Gameboard(props) {
  return(
    <>
      <div>
        <p>Right, you're in charge Commander {props.p1Name}!</p>
        <p>First up, where shall we put our boats?</p>
      </div>
    </>
  )
}

export default Gameboard;