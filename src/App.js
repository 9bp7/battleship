import './App.css';
import './assets/sea.jpg'
import React, {useState} from 'react';
import SplashText from './components/SplashText';
import SplashInput from './components/SplashInput';
import GameDisplay from './components/GameDisplay';

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

  switch(currentScreen) {
    case 0:
      toDisplay = <SplashText textToShow="Welcome to Battleship. Ready to go?"
                              btn1Text="Begin Mission"
                              btn1Func={() => setScreen(1)} />
      break;
    
    case 1:
      toDisplay = <SplashText textToShow="Who will you be fighting today?"
                              btn1Text="Commander Puter (AI)"
                              btn1Func={() => setScreen(2)}
                              btn2Text="Human"
                              btn2Disabled />
      break;

    case 2:
      toDisplay = <SplashText textToShow="Commander Puter is a tough nut to crack, but I think we got this."
                              btn1Text="Let's do it!"
                              btn1Func={() => setScreen(3)} />
      break;

    case 3:
      toDisplay = <SplashInput textToShow="Okay, so what shall we call you, Commander?"
                               inputPlaceholder="Your name, sir"
                               submitText="Battle"
                               submitFunc={(inputValue) => {
                                 setScreen(4);
                                 setName(1, inputValue);
                               }} />
      break;

    case 4:
      toDisplay = <GameDisplay opponent="ai"
                               p1Name={playerOneName} 
                               p2Name="Commander Puter" />
      break;
  }

  return(
    <div className="App">
      <div className="wrap">
        { currentScreen < 4 
          ? <h1>Battleship</h1>
          : <h2>Battleship</h2> }
        {toDisplay}
      </div>
    </div>    
  );
}

export default App;
