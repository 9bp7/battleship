function SplashText(props) {
  let buttons = [];
  buttons.push(<button onClick={props.btn1Func} disabled={props.btn1Disabled ? true : false}>{props.btn1Text}</button>);
  if(props.btn2Text) {
    buttons.push(<button onClick={props.btn2Func} disabled={props.btn2Disabled ? true : false}>{props.btn2Text}</button>);
  }

  return(
    <>
      <div>
        <p>{props.textToShow}</p>
        {buttons.map(btn => btn)}
      </div>
    </>
  );
}

export default SplashText;