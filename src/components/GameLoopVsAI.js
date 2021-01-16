import React, {useState, useEffect} from 'react';
import BoardPlayer from './boards/BoardPlayer';
import BoardEnemy from './boards/BoardEnemy';
import getRandomNumber from '../game/getRandomNumber';

function GameLoopVsAI(props) {
  let [playerAttacking, setPlayerAttacking] = useState(1);
  let [isEnabled, setIsEnabled] = useState(true);
  let [gameFinished, setGameFinished] = useState(false);
  let [text, setText] = useState([<p>{`Righty ho Commander ${props.playerOne.getName()}, it's time to show these muppets what we're made of. Good luck, and don't let us down!`}</p>])
  let [consecutiveMisses, setConsecutiveMisses]= useState(0);
  let [enemyConsecutiveMisses, setEnemyConsecutiveMisses]= useState(0);

  function addTextToLog(textToAdd, classes='', bigText = false) {
    let newTextLog = text;
    if(bigText) {
      newTextLog.unshift(<h3 className={classes}>{textToAdd}</h3>);
    } else {
      newTextLog.unshift(<p className={classes}>{textToAdd}</p>);
    }    
    setText(newTextLog);
  }

  // When playerAttacking changes, tell the AI to make its next shot, and add relevant message to the log
  useEffect(() => {
    if(playerAttacking === 2 && !gameFinished) {
      setIsEnabled(false);
      setTimeout(() => {
        let attackedCoords = props.playerTwo.attackGameboard(props.playerOne.getGameboard());
        if(props.playerOne.getGameboard().getTile(attackedCoords.x, attackedCoords.y).isOccupied()) {
          let ship = props.playerOne.getGameboard().getTile(attackedCoords.x, attackedCoords.y).getOccupyingShip();
          if(ship.isSunk()) {
            addTextToLog(`Bugger, the enemy sunk our ${ship.getName()}!`, 'warning');
          } else {
            let choice = getRandomNumber(0, 50);
            (choice > 0 && choice < 24) ? addTextToLog(`Ouch, the enemy hit our ${ship.getName()}!`) : addTextToLog(`Oof, they've landed a shot on our ${ship.getName()}!`);
          }          
          setEnemyConsecutiveMisses(0);
        } else {
          if(enemyConsecutiveMisses === 1) { // 2 times
            addTextToLog(`Our pitiful enemy has missed us twice in a row!`);
          } else if(enemyConsecutiveMisses === 3) { // 4 times
            addTextToLog(`Commander ${props.playerTwo.getName()} is laughable, that's 4 times they've missed us now!`);
          } else if(enemyConsecutiveMisses === 7) { // 8 times
            addTextToLog(`Oh my... could it be a record? Commander ${props.playerTwo.getName()} has missed us 8 times in a row!`);
          } else if(enemyConsecutiveMisses === 9) { // 10 times
            addTextToLog(`OK, nope, that's the record. Ten enemy shots in a row, and not one of them hit us! Awkward!`);
          }        
          setEnemyConsecutiveMisses(enemyConsecutiveMisses + 1);
        }

        setIsEnabled(true);
        if(props.playerOne.getGameboard().allShipsSunk()) {
          addTextToLog(`We lost the battle! Commander ${props.playerTwo.getName()} has blown our ships to pieces. Let's give it another go?`, 'game-log-loss', true);
          setIsEnabled(false);
          setGameFinished(true);
        } else {
          setPlayerAttacking(1);
        }        
      }, 500);      
    }
  }, [playerAttacking])

  // Allows player to make attack against the AI, and adds relevant message to the log
  function enemyReceivesAttack(x, y) {
    if(props.playerTwo.getGameboard().getTile(x, y).isOccupied()) {
      let ship = props.playerTwo.getGameboard().getTile(x, y).getOccupyingShip();
      if(ship.isSunk()) {
        addTextToLog(`Excellent work! We sunk their ${ship.getName()}!`, 'highlight');
      } else {
        let choice = getRandomNumber(0, 50);
        (choice > 0 && choice < 24) ? addTextToLog(`Great shot! We hit their ${ship.getName()}!`) : addTextToLog(`Solid work! We landed a shot on their ${ship.getName()}!`);
      }        
      setConsecutiveMisses(0);
    } else {
      if(consecutiveMisses === 2) { // 3 times
        addTextToLog(`We've missed the enemy three times in a row, get it together!`);
      } else if(consecutiveMisses === 4) { // 5 times
        addTextToLog(`You're not having much luck, are you Commander ${props.playerOne.getName()}? C'mon!`);
      } else if(consecutiveMisses === 6) { // 7 times
        addTextToLog(`7 misses in a row, Commander ${props.playerOne.getName()}? Quite frankly I expected better of you!`);
      } else if(consecutiveMisses === 9) { // 10 times
        addTextToLog(`Out of the 100 tiles on this board, you've somehow just missed a tenth of them in a row with no hits landed in between. I honestly have no words.`);
      } else if(consecutiveMisses === 14) { // 15 times
        addTextToLog(`15 consecutive shots. 15 consecutive misses. Dare I ask... Are you even trying to win, Commander ${props.playerOne.getName()}?!`);
      }       
      setConsecutiveMisses(consecutiveMisses + 1); 
    }

    if(props.playerTwo.getGameboard().allShipsSunk()) {
      addTextToLog(`WE WON THE BATTLE! We've sunk all of poxy ${props.playerTwo.getName()}'s ships! You made it look easy... Jolly good job, Commander ${props.playerOne.getName()}!`, 'game-log-win', true);
      setGameFinished(true);
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
        {gameFinished ? <button className="play-again">Play again</button> : null}
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

export default GameLoopVsAI;