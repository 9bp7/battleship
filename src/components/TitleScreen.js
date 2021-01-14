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
  return(
    <>
      <h1>Battleship</h1>
      <div>
        <p>And what shall we call you, Commander?</p>
        <form onSubmit={() => props.setScreen(3)}>
          <input type="text" placeholder="Your name"/>
          <input type="submit" value="Play" />
        </form>
      </div>
    </>
  )
}

export { TitleScreen, ChooseOpponentScreen, SetNameScreen };
