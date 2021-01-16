import React, {useState, useEffect} from 'react';
import BoardPlayer from './BoardPlayer';
import BoardEnemy from './BoardEnemy';

function GamePlaying(props) {
  let [playerAttacking, setPlayerAttacking] = useState(1);
  let [isEnabled, setIsEnabled] = useState(true);
  let [text, setText] = useState([<p>{`Righty ho Commander ${props.playerOne.getName()}, it's time to show these muppets what we're made of. Good luck, and don't let us down!`}</p>])

  function addTextToLog(textToAdd, classes='', bigText = false) {
    let newTextLog = text;
    if(bigText) {
      newTextLog.unshift(<h3 className={classes}>{textToAdd}</h3>);
    } else {
      newTextLog.unshift(<p className={classes}>{textToAdd}</p>);
    }    
    setText(newTextLog);
  }

  useEffect(() => {
    if(playerAttacking === 2) {
      setIsEnabled(false);
      setTimeout(() => {
        let attackedCoords = props.playerTwo.attackGameboard(props.playerOne.getGameboard());
        if(props.playerOne.getGameboard().getTile(attackedCoords.x, attackedCoords.y).isOccupied()) {
          let ship = props.playerOne.getGameboard().getTile(attackedCoords.x, attackedCoords.y).getOccupyingShip();
          if(ship.isSunk()) {
            addTextToLog(`Bugger, the enemy sunk our ${ship.getName()}!`, 'warning');
          } else {
            addTextToLog(`Ouch, the enemy hit our ${ship.getName()}!`);
          }          
        } else {
          addTextToLog(`Our pitiful enemy missed their shot! Ha!`);
        }

        if(props.playerOne.getGameboard().allShipsSunk()) {
          addTextToLog(`We lost the battle! Commander ${props.playerTwo.getName()} has blown our ships to pieces. Let's give it another go?`, 'game-log-loss', true);
          setIsEnabled(true);
          setIsEnabled(false);
        } else {
          setPlayerAttacking(1);
          setIsEnabled(true);
        }
        
      }, 500);      
    }
  }, [playerAttacking])

  function enemyReceivesAttack(x, y) {
    if(props.playerTwo.getGameboard().getTile(x, y).isOccupied()) {
      let ship = props.playerTwo.getGameboard().getTile(x, y).getOccupyingShip();
      if(ship.isSunk()) {
        addTextToLog(`Excellent work! We sunk their ${ship.getName()}!`, 'highlight');
      } else {
        addTextToLog(`Great shot! We hit their ${ship.getName()}!`);
      }        
    } else {
      addTextToLog(`We missed that shot, let's aim better next time.`);
    }
    if(props.playerTwo.getGameboard().allShipsSunk()) {
      addTextToLog(`WE WON THE BATTLE! We've sunk all of poxy ${props.playerTwo.getName()}'s ships! You made it look easy... Jolly good job, Commander ${props.playerOne.getName()}!`, 'game-log-win', true);
      setIsEnabled(true);
      setIsEnabled(false);
    } else {
      setPlayerAttacking(2);
    }
  }

  return(
    <>
      <div className="forty">
        <BoardPlayer gameboard={props.playerOne.getGameboard()}
                     isEnabled={isEnabled}/>
        <p className="white">Commander {props.playerOne.getName()}</p>
      </div>
      <div className="twenty game-log">
        <h3>Communications</h3>
        {text !== undefined ? text.map(text => text) : null}
      </div>
      <div className="forty">
        <BoardEnemy gameboard={props.playerTwo.getGameboard()}
                    isEnabled={isEnabled}
                    receiveAttack={enemyReceivesAttack}/>
        <p className="white">Commander {props.playerTwo.getName()}</p>
      </div>
    </>
  )
}

export default GamePlaying;