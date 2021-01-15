import React, {useState} from 'react';
import explosion from '../assets/nuclear-explosion.svg';
import miss from '../assets/water-drop.svg';

function BoardTile(props) {
  let classes = '';
  if(props.isEnemy && !props.isHit) {
    classes = "gameboard-tile";
  } else {
    classes = (props.isOccupied ? "gameboard-tile-occupied" : "gameboard-tile");
  }
  if(props.state === 'placing') {
    if(props.isHoveringValid !== null) {
      classes = (props.isHoveringValid ? classes += " gameboard-tile-hover-valid" : classes += " gameboard-tile-hover-invalid");
    }
  }
  if(props.state === 'attacking') {
    if(props.isHoveringValid !== null) {
      classes = (props.isHoveringValid ? classes += " gameboard-tile-hover-attack-valid" : classes += " gameboard-tile-hover-attack-invalid");
    }
  }
  let onClick = (props.onClick ? props.onClick : null);
  let onMouseOver = (props.onMouseOver ? props.onMouseOver : null);

  return(
    <> 
      <div className={classes} 
           onMouseOver={onMouseOver}
           onClick={onClick}> 
        {props.isHit && props.isOccupied ? <img src={explosion} className="hit" /> : null}        
        {props.isHit && !props.isOccupied ? <img src={miss} className="miss" /> : null}        
      </div>
    </>
  )
}

export default BoardTile;