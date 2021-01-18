import './App.css';
import './assets/sea.jpg'
import React, {useState} from 'react';
import SplashText from './components/splash/SplashText';
import SplashInput from './components/splash/SplashInput';
import GameDisplayRouter from './components/GameDisplayRouter';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [playerOneName, setPlayerOneName] = useState('Badman');
  const [playerTwoName, setPlayerTwoName] = useState('Bigboy');
  const [playerOnePreservedName, savePlayerOnePreservedName] = useState('');
  const [playerTwoPreservedName, savePlayerTwoPreservedName] = useState('');
  let toDisplay = '';

  function setName(player, name) {
    if(player === 1 && name.length > 0) {
      setPlayerOneName(name);
      savePlayerOnePreservedName(name);
    } else if(player === 2 && name.length > 0) {
      setPlayerTwoName(name);
      savePlayerTwoPreservedName(name);
    }
  }

  function setScreen(setTo) {
    setCurrentScreen(setTo);
  }

  switch(currentScreen) {
    case 0:
      toDisplay = <SplashText textToShow="Welcome to Battleship. Ready to start?"
                              btn1Text="Begin Mission"
                              btn1Func={() => setScreen(1)} />
      break;
    
    case 1:
      toDisplay = <SplashText textToShow="Who will you be fighting today?"
                              btn1Text="Commander Puter (AI)"
                              btn1Func={() => setScreen(2)}
                              btn2Text="A Friend (2-Player)"
                              btn2Func={() => setScreen(5)} />
      break;

    // Route: Playing AI
    case 2:
      toDisplay = <SplashText textToShow="Roger that, let's blow Commander Puter's fleet to smithereens!"
                              btn1Text="We'll teach him a bloody good lesson!"
                              btn1Func={() => setScreen(3)} />
      break;

    case 3:
      toDisplay = <SplashInput textToShow="That we will, sir. But before we sail off, remind me of your name..."
                               inputPlaceholder="Your name, sir"
                               inputInitialValue={playerOnePreservedName}
                               submitText="Battle"
                               submitFunc={(e, inputValue) => {
                                 e.preventDefault();
                                 setScreen(4);
                                 setName(1, inputValue);
                               }} />
      break;

    case 4:
      toDisplay = <GameDisplayRouter opponent="ai"
                                     p1Name={playerOneName} 
                                     p2Name="Puter" 
                                     globalSetScreen={setScreen}
                                     />
      break;
    
    // Route: Playing Human
    case 5:
      toDisplay = <SplashText textToShow="Right, I want a clean fight... JK, go blow each other's ships to smithereens."
                              btn1Text="Let's 'ave it!"
                              btn1Func={() => setScreen(6)} />
      break;

    case 6:
      toDisplay = <SplashInput textToShow="Okay, who's up first and what shall we call you?"
                               inputPlaceholder="Player 1's Name"
                               inputInitialValue={playerOnePreservedName}
                               submitText="Battle"
                               submitFunc={(e, inputValue) => {
                                 e.preventDefault();
                                 setScreen(7);
                                 setName(1, inputValue);
                               }} />
      break;

    case 7:
      toDisplay = <SplashInput textToShow="And commander number two, what's your name?"
                                inputPlaceholder="Player 2's Name"
                                inputInitialValue={playerTwoPreservedName}
                                submitText="Battle"
                                submitFunc={(e, inputValue) => {
                                  e.preventDefault();
                                  setScreen(8);
                                  setName(2, inputValue);
                                }} />
      break;
    
    case 8:
      toDisplay = <GameDisplayRouter opponent="human"
                                      p1Name={playerOneName} 
                                      p2Name={playerTwoName} 
                                      globalSetScreen={setScreen}
                                      />
      break;

    default:
      setCurrentScreen(0);
      break;
  }

  return(
    <div className="App">
      <div className="wrap">
        { currentScreen < 4 || (currentScreen > 4 && currentScreen < 8) 
          ? <h1>Battleship</h1>
          : <h2>Battleship</h2> }
        {toDisplay}
      </div>
    </div>    
  );
}

export default App;
