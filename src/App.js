import './App.css';
import './assets/sea.jpg'
import React, {useState} from 'react';
import { TitleScreen, ChooseOpponentScreen, SetNameScreen } from './components/TitleScreens';
import Display from './components/Display';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [playerOneName, setPlayerOneName] = useState('Badman');
  const [playerTwoName, setPlayerTwoName] = useState('Bigboy');
  let toDisplay = '';

  function setName(player, name) {
    if(player === 1 && name.length > 0) {
      setPlayerOneName(name);
    } else if(player === 2 && name.length > 0) {
      setPlayerTwoName(name);
    }
  }

  function setScreen(setTo) {
    setCurrentScreen(setTo);
  }

  if(currentScreen === 0) {
    toDisplay = <TitleScreen setScreen={setScreen} />
  } else if(currentScreen === 1) {
    toDisplay = <ChooseOpponentScreen setScreen={setScreen} />
  } else if(currentScreen === 2) {
    toDisplay = <SetNameScreen setScreen={setScreen} setName={setName} />
  } else if(currentScreen === 3) {
    toDisplay = <Display p1Name={playerOneName} p2Name={playerTwoName} />
  }

  return(
    <div className="App">
      <div className="wrap">
        {toDisplay}
      </div>
    </div>    
  );
}

export default App;
