var express = require('express');
var router = express.Router();
var request = require('request-promise');
var api = require('./_const');

// Get a list of all towers
router.get('/all/:startDate?/:endDate?', function(req, res) {
  if (req.params.startDate && req.params.endDate) {
    var options = {
      uri: api.API_TOWER_LIST + '?apiKey=' + req.cookies.userApiKey + '&start=' + req.params.startDate + '&end=' + req.params.endDate,
      json: true,
    };
  }
  else {
    var options = {
      uri: api.API_TOWER_LIST + '?apiKey=' + req.cookies.userApiKey + '&start=2010-01-01&end=2020-01-01',
      json: true,
    };
  }

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(error) {
      res.json(error);
    });
});

// Get statistics for towers
router.get('/stats/:startDate?/:endDate?', function(req, res) {

  if (req.params.startDate && req.params.endDate) {
    var options = {
      uri: api.API_TOWER_STATISTICS + '?apiKey=' + req.cookies.userApiKey + '&start=' + req.params.startDate + '&end=' + req.params.endDate,
      json: true,
    };
  }
  else {
    var options = {
      uri: api.API_TOWER_STATISTICS + '?apiKey=' + req.cookies.userApiKey + '&start=2010-01-01&end=2040-01-01',
      json: true,
    };
  }

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(error) {
      res.json(error);
    });
});

// Get tower info and statistics
router.get('/:id', function(req, res) {
  var towerId = req.params.id;

  var towerPromise = new Promise(function(resolve, reject) {
    request(api.API_TOWER_LIST + '?apiKey=' + req.cookies.userApiKey + '&start=2010-01-01&end=2040-01-01', function(error, response, body) {
      if (error) reject(error);
      else {
        var towers = JSON.parse(body);

        var tower = towers.find(function(obj) {
          return obj.tower_id === towerId;
        });

        resolve(tower);
      }
    });
  });

  var statsPromise = new Promise(function(resolve, reject) {
    request(api.API_TOWER_STATISTICS + '?apiKey=' + req.cookies.userApiKey + '&start=2010-01-01&end=2040-01-01', function(error, response, body) {
      if (error) reject(error);
      else {
        towerPromise.then(function(tower) {

          var list = JSON.parse(body);

          var stats = list.find(function(obj) {
            return obj.tower_id === towerId;
          });

          tower.stats = stats;

          res.json(tower);
        })
        .catch(function(error) {
          res.status(404).json({message: 'Unable to find tower'});
        })
      }
    })
  });

});

module.exports = router;
