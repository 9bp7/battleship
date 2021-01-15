import React, {useState} from 'react';
import image from '../assets/nuclear-explosion.svg';

function BoardTile(props) {
  let classes = (props.isOccupied ? "gameboard-tile-occupied" : "gameboard-tile");
  if(props.state === 'placing') {
    if(props.isHoveringValid !== null) {
      classes = (props.isHoveringValid ? classes += " gameboard-tile-hover-valid" : classes += " gameboard-tile-hover-invalid");
    }
  }
  if(props.state === 'attacking') {
    if(props.isHoveringValid !== null) {
      classes = (props.isHoveringValid ? classes += " gameboard-tile-hover-valid" : classes += " gameboard-tile-hover-invalid");
    }
  }
  let onClick = (props.onClick ? props.onClick : null);
  let onMouseOver = (props.onMouseOver ? props.onMouseOver : null);

  return(
    <> 
      <div className={classes} 
           onMouseOver={onMouseOver}
           onClick={onClick}> 
        {props.isHit ? <img src={image} className="hit" /> : null}        
      </div>
    </>
  )
}

export default BoardTile;