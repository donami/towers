var express = require('express');
var router = express.Router();
var request = require('request-promise');
var api = require('./_const');

// Get latest claimed tower
router.get('/latest-claim', function(req, res) {

  // Get personal info
  var mePromise = request({uri: api.API_ME + '?apiKey=' + req.cookies.userApiKey, json:true });

  // Get metadata
  var metaPromise = request({uri: api.API_TOWER_LIST + '?apiKey=' + req.cookies.userApiKey + '&start=2010-01-01&end=2040-01-01', json:true });

  // Get statistics
  var statsPromise = request({uri: api.API_TOWER_STATISTICS + '?apiKey=' + req.cookies.userApiKey + '&start=2010-01-01&end=2040-01-01', json:true });

  Promise.all([mePromise, metaPromise, statsPromise])
    .then(function(response) {
      res.json(response);
    })
    .catch(function(error) {
      res.json(error);
    });

});

// Display personal stats
router.get('/:startDate?/:endDate?', function(req, res) {
  var options = {
    uri: api.API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=2000-01-01&end=2020-01-01',
    json: true,
  };

  if (req.params.startDate && req.params.endDate) {
    options.uri = api.API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=' + req.params.startDate + '&end=' + req.params.endDate;
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(error) {
      res.json(error);
    });
});

module.exports = router;
