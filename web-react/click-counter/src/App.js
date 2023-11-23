import Button from './components/button';
import Counter from './components/counter';
import './App.css';
import logo from './images/Logo-U-tad.webp';
import { useState, useRef, useEffect } from 'react';

function App() {

  const [numClicks, setNumClicks] = useState(0);

  //Usamos useRef para capturar en manualInit el número introducido por el usuario en "input ref={manualInit}
  const manual = useRef();

  const handleClick = () => {
    setNumClicks(numClicks + 1);
  };

  const counterRestart = () => {
    setNumClicks(0);
  };

  const manualInit = () => {
    const num = Number(manual.current.value)
    setNumClicks(num);
    manual.current.value = null;
  };

  const randomInit = () => {
    fetch('https://www.randomnumberapi.com/api/v1.0/randomnumber')
      .then((response) => response.json())  
      .then((numbers) => setNumClicks(numbers[0]));
  };

  return (
    <div className="App">
      <div className="utad-logo-container">
        <img  
          className="utad-logo"
          src={logo}
          alt="Logo de u-tad" />
      </div>
      <div className="main-container">
        <Counter numClicks={numClicks} />
        <Button 
          text="Click"
          isClickButton={true}
          handleClick={handleClick} />
        <Button 
          text="Restart"
          isClickButton={false}
          handleClick={counterRestart} />
        <Button
           text="Auto"
           isClickButton={false}
           handleClick={randomInit} />
        <Button
           text="Manual"
           isClickButton={false}
           handleClick={manualInit} />
        <input 
          className="input"
          ref={manual} 
          type="text" 
          placeholder="Init number" />
      </div>
    </div>
  );
}

export default App;