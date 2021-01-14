import './App.css';
import './assets/sea.jpg'
import React, {useState} from 'react';
import { TitleScreen, ChooseOpponentScreen, SetNameScreen } from './components/TitleScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  let toDisplay = '';

  function setScreen(setTo) {
    setCurrentScreen(setTo);
  }

  if(currentScreen === 0) {
    toDisplay = <TitleScreen setScreen={setScreen} />
  } else if(currentScreen === 1) {
    toDisplay = <ChooseOpponentScreen setScreen={setScreen} />
  } else if(currentScreen === 2) {
    toDisplay = <SetNameScreen setScreen={setScreen} />
  } else if(currentScreen === 3) {
    toDisplay = <TitleScreen setScreen={setScreen} />
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
