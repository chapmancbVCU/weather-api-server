/**
 * @file Route for handling Open Weather Map API requests.
 * @author Chad Chapman
 */
require("dotenv").config();
const express = require('express');
const router = express.Router();
const url = require('url');


/* GET api listing. */
router.get('/', async function(req, res, next) {
  // Parse query section of request.
  let { query, pathname: path } = url.parse(req.url, true);
  
  console.log("\n\n--------------------------------------------------------------------------------");
  console.log("QUERY INFORMATION");
  console.log(query);

  let data;
  // Set response data to object we can send as JSON response.
  let responseData = [
    { key: {data} }
  ];

  let weatherApiRequestURL = "";
  let weatherData;

  // Determine what type of request and handle appropriately.
  if(query.type) {
    if(query.type == "SIMPLE") {
      weatherApiRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
      weatherData = await getWeatherData(weatherApiRequestURL);
    } else if(query.type == "ONECALL") {
      weatherApiRequestURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${query.lat}&lon=${query.lon}&units=${query.units}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
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