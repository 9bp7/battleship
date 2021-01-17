const Tile = () => {
  let hit = false;
  let occupied = false;
  let occupyingShip = null;

  const setHit = (isHit) => hit = isHit;
  const isHit = () => {
    return hit;
  }

  const setOccupied = (isOccupied, shipIndex) => {
    occupied = isOccupied;
    occupyingShip = shipIndex;
  };
  const isOccupied = () => {
    return occupied;
  };
  const getOccupyingShip = () => {
    return occupyingShip;
  }

  return { setHit, isHit, setOccupied, isOccupied, getOccupyingShip }
}

export default Tile;