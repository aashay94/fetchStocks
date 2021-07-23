import { useState } from 'react';
import './index.css';


function StockData() {
  const [fetched, setFetched]  = useState(false)
  const [date, setDate] = useState('')
  const [stockData, setStockData] = useState(null)
  const ApiUrl = "https://jsonmock.hackerrank.com/api/stocks?date=";
  const http = require("http");
  const axios = require('axios').default;

  const handleChange = (element) => {
    setDate(element.target.value)
  }

  const httpStocks = (event) => {
    http.get(ApiUrl + date, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        let result = JSON.parse(body);
        handleJsonResponse(result)
      });
    });
  }

  const fetchStocks = (event) => {
    event.preventDefault();
    fetch(ApiUrl + date,  {
      method: "GET", 
      mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    	})
    .then(response => response.json())
    .then(result => {
      handleJsonResponse(result)
    });
  }

  const axiosStocks = (event) => {
    event.preventDefault();
    axios.get(ApiUrl + date)
    .then(result => {
      handleJsonResponse(result.data)
    });
  }

  const handleJsonResponse = (jsonResponse) => {
    console.log(jsonResponse)
    const { data } = jsonResponse;
    console.log(data)
    console.log(data[0])
    if(data && !!data.length) {
      setStockData(data[0]);
      console.log(data)
    } else {
      setStockData(null);
    }
    setFetched(true)
  }

  //5-january-2000
  return (
    <div>
      <input id='app-input' type='text' className='app-input' onChange={ handleChange } ></input>
      <button id='submit-button' className='submit-button' onClick={httpStocks}>Get with http</button>
      <button id='submit-button1' className='submit-button' onClick={fetchStocks}>Get with fetch</button>
      <button id='submit-button2' className='submit-button' onClick={axiosStocks}>Get with axios</button>
      {fetched && stockData ?
        <ul id="stockData">
          <li>Open: {stockData.open}</li>
          <li>Close: {stockData.close}</li>
          <li>High: {stockData.high}</li>
          <li>Low: {stockData.low}</li>
        </ul>  : 
        <div id="no-result">
          {fetched &&  !stockData && "No Results Found" }
        </div>}
    </div>
  );
}

export default  StockData;
