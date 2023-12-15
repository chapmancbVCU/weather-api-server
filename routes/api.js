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
  fs.readFile('apikey.txt', 'utf8', (err, data) => {
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
    if(query.type) {
      if(query.type == "SIMPLE") {
        weatherApiRequestURL = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${data}`;
        console.log("Request URL: " + weatherApiRequestURL);
      }

      // Send response back to requestor.
      res.json({
        data: weatherApiRequestURL
      });
    }

  });
  
});

module.exports = router;
