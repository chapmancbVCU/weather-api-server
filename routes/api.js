/**
 * @file Route for handling Open Weather Map API requests.
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
    console.log("\n\n--------------------------------------------------------------------------------");
    console.log("QUERY INFORMATION");
    console.log(query);

    // Set key to object we can send as JSON response.
    let apiKey = [
      { key: {data} }
    ];

    let weatherApiRequestURL = "";
    let weatherData;

    // Determine what type of request and handle appropriately.
    if(query.type) {
      if(query.type == "SIMPLE") {
        weatherApiRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${data}`;
        weatherData = await getWeatherData(weatherApiRequestURL);
      } else if(query.type == "ONECALL") {
        weatherApiRequestURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${query.lat}&lon=${query.lon}&units=${query.units}&appid=${data}`;
        weatherData = await getWeatherData(weatherApiRequestURL);
      } else {
        let badRequestObj = { message: "Invalid request type.  We currently support the free SIMPLE and ONECALL fetch requests."}
        weatherData = JSON.stringify(badRequestObj);
      }

      console.log("\nQUERY RESPONSE");
      console.log(weatherData);
      
      // Send response back to requestor.
      res.json({
        data: weatherData
      });
    }
  });
});


/**
 * Performs the actual fetch request to Open Weather Map using the URL 
 * assembled by the API's GET request.
 * @param {string} requestURL The url that is used for the fetch request will 
 * send to Open Weather Map. 
 * @returns A JSON string containing the response from Open Weather Map.
 */
async function getWeatherData(requestURL) {
  try {
    const response = await fetch(requestURL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}


module.exports = router;