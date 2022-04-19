import './App.css';
import React, { useState, useEffect } from 'react';
const axios = require("axios");
const { wordsToNumbers } = require('words-to-numbers');


let dataOne = 0;
let dataTwo = 0;
let operations = ["plus", "minus", "times", "divided by"];

async function onClick(){
  console.log("clicked");
  let data;
  var config = {
    method: 'get',
    url: "https://100insure.com/mi/api1.php"
  };

  await axios(config)
  .then(function (response) {
      console.log (response.data);
      data = response.data;
      dataOne = wordsToNumbers(data.key1);
      dataTwo = wordsToNumbers(data.key2);
  })
  .catch(function (error) {
      console.log(error);
  });

  App();

/*
  var configTwo = {
    method: 'post',
    url: "https://100insure.com/mi/api2.php",
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      num1: dataOne,
      num2: dataTwo,
      operation: plus
    }
  }

  console.log(configTwo.data)
  await axios (configTwo)
  .then(function (response) {
      console.log (response.data);
      data = response.data;
  })
  .catch(function (error) {
      console.log(error);
  });
*/
}

class firstNumber extends React.Component{
  render() {
    return (
      <button className="numberOne">
        {dataOne}
      </button>
    );
  }
}


function App() {

  const styleObj = {
    fontSize: 44,
    color: "white",
    textAlign: "center",
    paddingTop: "100px",
  }

  const [posts, setPosts] = useState([]);

  const apiEndPointOne = "https://100insure.com/mi/api1.php";

  let data = {
    num1: dataOne,
    num2: dataTwo,
    operation: "plus"
  }

  useEffect(() => {
    const getPosts = async () => {
      const resultOne = await axios.get(apiEndPointOne);
      //console.log(resultOne.data)
      dataOne =  wordsToNumbers(resultOne.data.key1);
      dataTwo =  wordsToNumbers(resultOne.data.key2);
      setPosts(resultOne);

      let resultTwo;
      var configTwo = {
        method: 'post',
        url: "https://100insure.com/mi/api2.php",
        headers: {
          'Content-Type': 'application/json'
        },
        num1: dataOne,
        num2: dataTwo,
        operation: "plus"  
      }
      resultTwo = await axios.post('https://100insure.com/mi/api2.php', { 
        num1: dataOne,
        num2: dataTwo,
        operation: "plus"   
      }, {
        headers: {
          // 'application/json' is the modern content-type for JSON, but some
          // older servers may use 'text/json'.
          // See: http://bit.ly/text-json
          'Content-Type': 'application/json'
        }
      });
      console.log(resultTwo);
/*
      await axios (configTwo)
      .then(function (response) {
        console.log (response);
        console.log (response.data);
        resultTwo = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(resultTwo.data);
*/
    };

    getPosts();

    
  }, []);
  
  
  console.log(`B
              ${dataOne}
              ${dataTwo}
              `);
  return (
    <div className="App">
    <button onClick = {App}type="RUN">RUN</button>
    
    <p style={styleObj}>{dataOne}+{dataTwo}=</p>
    <p style={styleObj}>{dataOne}-{dataTwo}=</p>
    <p style={styleObj}>{dataOne}*{dataTwo}=</p>
    <p style={styleObj}>{dataOne}÷{dataTwo}=</p>
  
    </div>
  );
}

export default App;
