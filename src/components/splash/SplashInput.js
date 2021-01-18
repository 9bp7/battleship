import React, {useState, useEffect} from 'react';

function SplashInput(props) {
  let [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if(props.inputInitialValue && props.inputInitialValue.length > 0) {
      setInputValue(props.inputInitialValue);
    }
  }, [])

  useEffect(() => {
    if(props.inputInitialValue && props.inputInitialValue.length > 0) {
      setInputValue(props.inputInitialValue);
    } else {
      setInputValue('');
    }
  }, [props.textToShow])

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return(
    <>
      <div>
        <p>{props.textToShow}</p>
        <form onSubmit={e => props.submitFunc(e, inputValue)}>
          <input type="text" placeholder={props.inputPlaceholder} onChange={e => handleChange(e)} value={inputValue}/>
          <input type="submit" value={props.submitText} />
        </form>
      </div>
    </>
  );
}

export default SplashInput;