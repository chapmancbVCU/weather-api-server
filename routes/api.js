/**
 * @author Chad Chapman
 */
const express = require('express');
const fs = require('node:fs');
const router = express.Router();
const url = require('url');


/* GET api listing. */
router.get('/', function(req, res, next) {
  // Parse query section of request.
  let { query, pathname: path } = url.parse(req.url, true);
  
  // Read api key from file.
  fs.readFile('apikey.txt', 'utf8', async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).send({ message: err });
    }
    console.log(query);

    // Set key to object we can send as JSON response.
    let apiKey = [
      { key: {data} }
    ];

    let weatherApiRequestURL = "";
    let weatherData;
    if(query.type) {
      if(query.type == "SIMPLE") {
        weatherApiRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${data}`;
        weatherData = await getSimpleData(weatherApiRequestURL);

        console.log(weatherData);
      }

      // Send response back to requestor.
      res.json({
        data: weatherData
      });
    }

  });
  // Set key to object we can send as JSON response.
  // let apiKey = [
  //   { key: {data} }
  // ];
  // // Send response back to requestor.
  // res.json({
  //   data: apiKey 
  // });
});

async function getSimpleData(requestURL) {
  try {
    const response = await fetch(requestURL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
module.exports = router;
