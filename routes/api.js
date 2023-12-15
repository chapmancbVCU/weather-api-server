var express = require('express');
var router = express.Router();
const url = require('url');


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(url.parse(req.url, true));
  let apiKey = [
    { key: "myKey" }
  ];

  res.json({
    data: apiKey
  });
});

module.exports = router;
