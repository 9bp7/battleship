const Ship = (position, axis, name = '') => {
  const shipLength = position.length;

  // From the length, create an array to keep track of hits
  let hits = [];
  for(let i = 0; i < shipLength; i++) {
    hits.push({
      position: position[i],
      hit: false,
    })
  }

  const isSunk = () => {
    // Go through all hits. If any are false, return false, else return true
    for(let i = 0; i < shipLength; i++) {
      if(hits[i].hit === false) {
        return false;
      }
    }
    return true;
  }

  const hit = (hitPosition) => {
    // Find position in hits[], return true if hit has not already been registered
    // Else return false 
    for(let i = 0; i < shipLength; i++) {
      if(hits[i].position === hitPosition[axis]) {
        if(hits[i].hit === false) {
          hits[i].hit = true;
          return true;
        } else {
          return false;
        }        
      }
    }
  }

  const getName = () => {
    if(name) {
      return name;
    }
  }

  return { hit, isSunk, getName };
}

export { Ship };