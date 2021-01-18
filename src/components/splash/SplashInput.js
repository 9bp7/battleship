import React, {useState, useEffect} from 'react';

function SplashInput(props) {
  let [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if(props.inputInitialValue && props.inputInitialValue.length > 0) {
      setInputValue(props.inputInitialValue);
    }
  }, []);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return(
    <>
      <div>
        <p>{props.textToShow}</p>
        <form onSubmit={() => props.submitFunc(inputValue)}>
          <input type="text" placeholder={props.inputPlaceholder} onChange={e => handleChange(e)} value={inputValue}/>
          <input type="submit" value={props.submitText} />
        </form>
      </div>
    </>
  );
}

export default SplashInput;