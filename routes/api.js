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

    // Declare variable for data here for use later.
    let weatherAPIData;

    // Determine what type of request and handle appropriately.
    if(query.type) {
        if(query.type === "SIMPLE") {
            weatherAPIData = await getWeatherAPIData(`http://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`);
        } else if(query.type === "ONECALL") {
            weatherAPIData = await getWeatherAPIData(`http://api.openweathermap.org/data/3.0/onecall?lat=${query.lat}&lon=${query.lon}&units=${query.units}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`);
        } else if(query.type === "SEARCH_TERM") {
            weatherAPIData = await getWeatherAPIData(`http://api.openweathermap.org/geo/1.0/direct?q=${query.searchTerm}&limit=${process.env.SEARCH_TERM_LIMIT}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`);
        } else {
            weatherAPIData = JSON.stringify({ message: "Invalid request type.  We currently support the free SIMPLE, ONECALL, and geolocation API requests from Open Weather Map."});
        }

        console.log("\nQUERY RESPONSE");
        console.log(weatherAPIData);
        
        // Send response back to requestor.
        res.json({
        data: weatherAPIData
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
async function getWeatherAPIData(requestURL) {
    try {
        const response = await fetch(requestURL);
        console.log(response)
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}


module.exports = router;