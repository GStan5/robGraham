import './App.css';
import React, { useState } from 'react';
const axios = require("axios");
const { wordsToNumbers } = require('words-to-numbers');


let dataOne = 0;
let dataTwo = 0;
let plusAnswer = 0;
let minusAnswer = 0;
let timesAnswer = 0;
let dividedAnswer = 0;
let operations = ["plus", "minus", "times", "divided by"];



function App() {

  //Style
  const styleObj = {
    fontSize: 44,
    color: "white",
    textAlign: "center",
    paddingTop: "100px",
  }

  //URIs
  const apiEndPointOne = "https://100insure.com/mi/api1.php";
  const apiEndPointtwo = 'https://100insure.com/mi/api2.php'


  //usStates
  const [valueOneData, setValueOne] = useState(0);
  const [valueTwoData, setValueTwo] = useState(0);
  const [plusAnswerData, setPlusAnswer] = useState(0);
  const [minusAnswerData, setMinusAnswer] = useState(0);
  const [timesAnswerData, setTimesAnswer] = useState(0);
  const [dividedAnswerData, setDividedAnswer] = useState(0);


  //gets all the updated values
  const getValues = async () => {

    //initial variables from apiEndPointOne
    const resultOne = await axios.get(apiEndPointOne);
    dataOne =  wordsToNumbers(resultOne.data.key1);
    dataTwo =  wordsToNumbers(resultOne.data.key2);
    setValueOne(dataOne);
    setValueTwo(dataTwo);



    //plus call
    var configPlus = {
      method: 'post',
      url: apiEndPointtwo,
      data : JSON.stringify({
        "num1": dataOne,
        "num2": dataTwo,
        "operation": operations[0]
      })
    };
    axios(configPlus)
    .then(function (response) {
      console.log("plus: " + response.data);
      plusAnswer = response.data
      setPlusAnswer(plusAnswer); 
    })
    .catch(function (error) {
      console.log(error);
    });



    //minus call
    var configMinus = {
      method: 'post',
      url: apiEndPointtwo,
      data : JSON.stringify({
        "num1": dataOne,
        "num2": dataTwo,
        "operation": operations[1]
      })
    };
    axios(configMinus)
    .then(function (response) {
      console.log("minus: " + response.data);
      minusAnswer = response.data
      setMinusAnswer(minusAnswer); 
    })
    .catch(function (error) {
      console.log(error);
    });



    //times call
    var configTimes = {
      method: 'post',
      url: apiEndPointtwo,
      data : JSON.stringify({
        "num1": dataOne,
        "num2": dataTwo,
        "operation": operations[2]
      })
    };
    axios(configTimes)
    .then(function (response) {
      console.log("times: " + response.data);
      timesAnswer = response.data
      setTimesAnswer(timesAnswer); 
    })
    .catch(function (error) {
      console.log(error);
    });



    //divide call
    var configDivide = {
      method: 'post',
      url: apiEndPointtwo,
      data : JSON.stringify({
        "num1": dataOne,
        "num2": dataTwo,
        "operation": operations[3]
      })
    };
    axios(configDivide)
    .then(function (response) {
      console.log("divide: " + response.data);
      dividedAnswer = response.data
      setDividedAnswer(dividedAnswer); 
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /*
  console.log(`DATA:
              ${dataOne}
              ${dataTwo}
              `);

  */

  return (
    <div className="App">
    <button onClick = {getValues}type="RUN">RUN</button>
    
    <p style={styleObj}>{dataOne}+{dataTwo}={plusAnswer}</p>
    <p style={styleObj}>{dataOne}-{dataTwo}={minusAnswer}</p>
    <p style={styleObj}>{dataOne}*{dataTwo}={timesAnswer}</p>
    <p style={styleObj}>{dataOne}÷{dataTwo}={dividedAnswer}</p>
  
    </div>
  );
}

export default App;
