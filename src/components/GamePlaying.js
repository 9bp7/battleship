import React, {useState, useEffect} from 'react';
import BoardPlayer from './BoardPlayer';
import BoardEnemy from './BoardEnemy';

function GamePlaying(props) {
  let [playerAttacking, setPlayerAttacking] = useState(1);
  let [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if(playerAttacking === 2) {
      setIsEnabled(false);
      setTimeout(() => {
        props.playerTwo.attackGameboard(props.playerOne.getGameboard());
        setPlayerAttacking(1);
        setIsEnabled(true);
      }, 1000);      
    }
  }, [playerAttacking])

  return(
    <>
      <p>Let's beat these fuckers!</p>
      <div className="half">
        <BoardPlayer gameboard={props.playerOne.getGameboard()}
                     isEnabled={isEnabled}/>
        <p className="white">Commander {props.playerOne.getName()}</p>
      </div>
      <div className="half">
        <BoardEnemy gameboard={props.playerTwo.getGameboard()}
                    isEnabled={isEnabled}
                    receiveAttack={() => setPlayerAttacking(2)}/>
        <p className="white">Commander Puter</p>
      </div>
    </>
  )
}

export default GamePlaying;