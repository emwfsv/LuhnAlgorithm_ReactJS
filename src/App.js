import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// This function will determine if the input value entered is correct or not
// Function is using the Luhn Algorithm and /10 to check if correct or not.
// https://sv.wikipedia.org/wiki/Luhn-algoritmen

function App() {

  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(message);

  const handleChange = (event) => {
    // remove +-e
    //const val = event.target.value
    //if(!val.match(/0-9/))
      setMessage(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    setUpdated(message);
  };

  //const [test, eval] = useState(0)
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter a number 'Min 6 digits' below and press the 'Evaluate Luhn' button to check if the luhn value is correct.
        </p>
        <p>
          <input value={message} name="message" id="message" type="number" minLength="6"  width="20" size="12" onChange={handleChange}/>
          <text> </text>
          <button onClick={handleClick}>Evaluate Luhn</button>
        </p>
        <p>
          <text name="outputValue">Calculated value is: '{CalculateLuhn(updated)}'</text>
        </p>
      </div> 
    </div>
    
    );
}



function CalculateLuhn(inputValue){

  //Constructors
  let luhnValue = 0;
  let factor = 1;
  let response = '';

  //Split inputValue to an array of strings and convert it to an array of integers with .map.
  var intArr = String(inputValue).split("").map((num)=> Number(num)).reverse();

  //Step thru every index and multiply every second number with 2, 1, 2... and so on
  ({ factor, luhnValue } = CalculateLuhnSum(intArr, factor, luhnValue));

  //Now lets check if the calculated luhn value is possible to split by 10.
  var intArrReduced = intArr.slice(1).reverse();
  if(luhnValue % 10 === 0)
  {
    response = luhnValue > 0 ? 'Correct' : '';
  }
  else
  {

    //This time we should recalculate and get the expected value. Reset the parameters....
    factor = 2;
    luhnValue = 0;
    ({ factor, luhnValue } = CalculateLuhnSum(intArrReduced, factor, luhnValue));

    response = String('Incorrect. Expected value: ' + (10 - (luhnValue % 10)));
  }

  return(response)
}


function CalculateLuhnSum(intArr, factor, luhnValue) {
  for (let i = 0; i < intArr.length; i++) {

    //Multiply the indexed array with a factor
    var sum = intArr[i] * factor;

    if (sum > 9) {
      //Split numbers above 10 in sum into 0-9 and summarize them.
      var sumArr = String(sum).split("").map((num) => Number(num));

      //Declare a known value here to avoid eSlint warning, sum both values in the array and add to final value.
      let val = 0;
      sumArr.forEach(async (element) => { val += element; });
      luhnValue += val;
    }

    else {
      luhnValue += sum;
    }

    //Change state of the factor for next loop.
    factor = factor > 1 ? 1 : 2;

  }
  return { factor, luhnValue };
}

export default App;

