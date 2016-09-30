var express = require('express');
var router = express.Router();
var request = require('request-promise');
var api = require('./_const');

router.get('/first-tower', function(req, res) {
  var options = {
    uri: api.API_HALL_OF_FAME_FIRST_TOWER + '?apiKey=' + req.cookies.userApiKey,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

router.get('/', function(req, res) {
  res.json([]);
});

module.exports = router;
