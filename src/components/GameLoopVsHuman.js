import React, {useState, useEffect} from 'react';
import BoardPlayer from './boards/BoardPlayer';
import BoardEnemy from './boards/BoardEnemy';
import getRandomNumber from '../game/getRandomNumber';

function GameLoopVsHuman(props) {
  let [playerAttacking, setPlayerAttacking] = useState(1);
  let [passDeviceButton, showPassDeviceButton] = useState(false);
  let [passingDeviceScreen, showPassingDeviceScreen] = useState(false);
  let [isEnabled, setIsEnabled] = useState(true);
  let [gameFinished, setGameFinished] = useState(false);
  let [text, setText] = useState([<p>{`Right then, it's Commander ${props.playerOne.getName()} vs. Commander ${props.playerTwo.getName()}. May the best fighter win - good luck!`}</p>])
  let [p1ConsecutiveMisses, setP1ConsecutiveMisses]= useState(0);
  let [p2ConsecutiveMisses, setP2ConsecutiveMisses]= useState(0);

  function addTextToLog(textToAdd, classes='', bigText = false) {
    let newTextLog = text;
    if(bigText) {
      newTextLog.unshift(<h3 className={classes}>{textToAdd}</h3>);
    } else {
      newTextLog.unshift(<p className={classes}>{textToAdd}</p>);
    }    
    if(newTextLog.length > 10) {
      newTextLog.pop();
    }
    setText(newTextLog);
  }

  useEffect(() => {
    if(passingDeviceScreen === true) {
      setPlayerAttacking((playerAttacking === 1 ? 2 : 1));
    } else if(passingDeviceScreen === false) {
      setIsEnabled(true);
      showPassDeviceButton(false);
    }
  }, [passingDeviceScreen])

  function enemyReceivesAttack(x, y) {
    let attackingPlayer = (playerAttacking === 1 ? props.playerOne : props.playerTwo);
    let receivingPlayer = (playerAttacking === 1 ? props.playerTwo : props.playerOne);
    if(receivingPlayer.getGameboard().getTile(x, y).isOccupied()) {
      let ship = receivingPlayer.getGameboard().getTile(x, y).getOccupyingShip();
      if(ship.isSunk()) {
        addTextToLog(`BOOM! Commander ${attackingPlayer.getName()} just sunk Commander ${receivingPlayer.getName()}'s ${ship.getName()}!`, 'highlight');
      } else {
        let choice = getRandomNumber(0, 50);
        (choice > 0 && choice < 24) ? addTextToLog(`Great shot Cmdr ${attackingPlayer.getName()}! You hit their ${ship.getName()}!`) : addTextToLog(`Solid work Cmdr ${attackingPlayer.getName()}! You landed a shot on their ${ship.getName()}!`);
      }        
      (playerAttacking === 1 ? setP1ConsecutiveMisses(0) : setP2ConsecutiveMisses(0));
    } else {
      let consecutiveMisses = (playerAttacking === 1 ? p1ConsecutiveMisses : p2ConsecutiveMisses);
      if(consecutiveMisses === 2) { // 3 times
        addTextToLog(`Cmdr ${attackingPlayer.getName()} has missed their enemy three times in a row, get it together!`);
      } else if(consecutiveMisses === 4) { // 5 times
        addTextToLog(`You're not having much luck, are you Cmdr ${attackingPlayer.getName()}? C'mon!`);
      } else if(consecutiveMisses === 6) { // 7 times
        addTextToLog(`7 misses in a row, Cmdr ${attackingPlayer.getName()}? Quite frankly I expected better of you!`);
      } else if(consecutiveMisses === 9) { // 10 times
        addTextToLog(`Out of the 100 tiles on this board, Cmdr ${attackingPlayer.getName()} somehow just missed a tenth of them in a row with no hits landed in between. I honestly have no words.`);
      } else if(consecutiveMisses === 14) { // 15 times
        addTextToLog(`15 consecutive shots. 15 consecutive misses. Dare I ask... Are you even trying to win, Cmdr ${attackingPlayer.getName()}?!`);
      }       
      (playerAttacking === 1 ? setP1ConsecutiveMisses(p1ConsecutiveMisses + 1) : setP2ConsecutiveMisses(p2ConsecutiveMisses + 1));
    }

    if(receivingPlayer.getGameboard().allShipsSunk()) {
      addTextToLog(`The battle is won, Commander ${attackingPlayer.getName()} sunk all of Commander ${receivingPlayer.getName()}'s ships! Jolly good job, Commander ${attackingPlayer.getName()}!`, 'game-log-win');
      addTextToLog(`Cmdr ${attackingPlayer.getName()} WINS!`, 'game-log-win-header', true);
      setGameFinished(true);
      setIsEnabled(false);
    } else {
      setIsEnabled(false);
      showPassDeviceButton(true);
    }
  }

  // Show a screen in between turns that the player must dismiss
  // Ensures that players do not see each other's boards
  if(passingDeviceScreen) {
    return(
      <div className="passing-device">
        <h3>Pass device to Commander {playerAttacking === 1 ? props.playerOne.getName() : props.playerTwo.getName()}...</h3>
        <button onClick={() => showPassingDeviceScreen(false)}>Continue</button>
      </div>
    )
  }

  return(
    <>
      <div className="forty">
        <BoardPlayer gameboard={playerAttacking === 1 ? props.playerOne.getGameboard() : props.playerTwo.getGameboard()}
                     isEnabled={isEnabled}/>
        <p className="white">Commander {playerAttacking === 1 ? props.playerOne.getName() : props.playerTwo.getName()}</p>
      </div>
      <div className="twenty">
        <div className="game-log">
          <h3>Communications</h3>
          {text !== undefined ? text.map(text => text) : null}
        </div>
        
        {gameFinished ? <button onClick={() => props.globalSetScreen(0)} className="play-again">Play again</button> : null}
        {passDeviceButton ? <button onClick={() => showPassingDeviceScreen(true)} className="pass-device">Pass Device</button> : null}
      </div>
      <div className="forty">
        <BoardEnemy gameboard={playerAttacking === 1 ? props.playerTwo.getGameboard() : props.playerOne.getGameboard()}
                    isEnabled={isEnabled}
                    receiveAttack={enemyReceivesAttack}/>
        <p className="white">Commander {playerAttacking === 1 ? props.playerTwo.getName() : props.playerOne.getName()}</p>
      </div>
    </>
  )
}

export default GameLoopVsHuman;