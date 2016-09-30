var express = require('express');
var router = express.Router();
var request = require('request-promise');
var api = require('./_const');

// Get leaderboard
router.get('/:startDate?/:endDate?', function(req, res) {
  var options = {
    uri: api.API_LEADERBOARD + '?apiKey=' + req.cookies.userApiKey + '&start=2000-01-01&end=2020-01-01',
    json: true,
  };

  if (req.params.startDate && req.params.endDate) {
    var options = {
      uri: api.API_LEADERBOARD + '?apiKey=' + req.cookies.userApiKey + '&start=' + req.params.startDate + '&end=' + req.params.endDate,
      json: true,
    };
  }

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

module.exports = router;
