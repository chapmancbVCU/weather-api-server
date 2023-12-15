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
  if(query.type) {
    console.log(query.type);  
  }

  // Read api key from file.
  fs.readFile('apikey.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).send({ message: 'Internal server error.'});
    }

    console.log(data);
    let apiKey = [
      { key: {data} }
    ];

    // Send response back to requestor.
    res.json({
      data: apiKey
    });
  });
  
});

module.exports = router;
