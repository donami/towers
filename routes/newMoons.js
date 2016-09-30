var express = require('express');
var router = express.Router();
var request = require('request-promise');
var api = require('./_const');

router.get('/', function(req, res) {
  var options = {
    uri: api.API_NEW_MOONS,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

module.exports = router;
