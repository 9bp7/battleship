import React, {useState} from 'react';

function BoardTile(props) {
  
  let classes = (props.isOccupied ? "gameboard-tile-occupied" : "gameboard-tile");
  classes = (props.isHoveringValid ? classes += " gameboard-tile-hover-valid" : classes);
  classes = (props.isHoveringInvalid ? classes += " gameboard-tile-hover-invalid" : classes);

  return(
    <> 
      <div className={classes} onMouseOver={() => props.onMouseOver(props.x, props.y)}>
         
      </div>
    </>
  )
}

export default BoardTile;