import React, {useState} from 'react';

function TitleScreen(props) {
  return(
    <>
      <h1>Battleship</h1>
      <div>
        <p>Welcome to Battleship. Ready to go?</p>
        <button onClick={() => props.setScreen(1)}>Begin Mission</button>
      </div>
    </>
  )
}

function ChooseOpponentScreen(props) {
  return(
    <>
      <h1>Battleship</h1>
      <div>
        <p>Who will you be fighting today?</p>
        <button onClick={() => props.setScreen(2)}>Computer</button>
        <button disabled>Human</button>
      </div>
    </> 
  )
}

function SetNameScreen(props) {
  let [classNames, setClassNames] = useState('');
  let [nameValue, setNameValue] = useState('');

  function setScreen(e) {
    e.preventDefault();
    if(classNames !== 'fade-out') {
      props.setName(1, nameValue);
      setClassNames('fade-out');
      setTimeout(() => {
        props.setScreen(3);
      }, 1500);
    }    
  }

  function handleChange(e) {
    setNameValue(e.target.value);
  }

  return(
    <>
      <h1>Battleship</h1>
      <div className={classNames}>
        <p>And what shall we call you, Commander?</p>
        <form onSubmit={e => setScreen(e)}>
          <input type="text" placeholder="Your name" onChange={e => handleChange(e)} value={nameValue}/>
          <input type="submit" value="Play" />
        </form>
      </div>
    </>
  )
}

export { TitleScreen, ChooseOpponentScreen, SetNameScreen };
