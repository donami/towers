var express = require('express');
var router = express.Router();
var request = require('request-promise');

const API_TOWER_LIST = 'https://play.2good.com/api/v1/public/towers/metadata?apiKey=G7gL2P8xidoaGh4qTqY5CVL0nPSFyAuO&start=2016-01-01&end=2017-01-01';
const API_TOWER_STATISTICS = 'https://play.2good.com/api/v1/public/towers/statistics?apiKey=G7gL2P8xidoaGh4qTqY5CVL0nPSFyAuO&start=2016-01-01&end=2017-01-01';
const API_LEADERBOARD = 'https://play.2good.com/api/v1/public/leaderboards/claims?apiKey=G7gL2P8xidoaGh4qTqY5CVL0nPSFyAuO&start=2016-01-01&end=2017-01-01';

// Get top 10 leaderboard
router.get('/leaderboard/top', function(req, res) {
  var options = {
    uri: API_LEADERBOARD,
    json: true,
  };

  request(options)
    .then(function(data) {

      // Sort the data by most claims
      var sortedData = data.sort(function(a, b) {
        return b.claim_count - a.claim_count;
      });

      // Get only the top ten
      sortedData = sortedData.slice(0, 10);

      res.json(sortedData);
    }, function(err) {
      res.json(err);
    });
})


// Get leaderboard
router.get('/leaderboard', function(req, res) {
  var options = {
    uri: API_LEADERBOARD,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

// Get a list of all towers
router.get('/tower/all', function(req, res) {
  var options = {
    uri: API_TOWER_LIST,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(error) {
      res.json(error);
    });
});

// Get tower info and statistics
router.get('/tower/:id', function(req, res) {
  var towerId = req.params.id;

  var towerPromise = new Promise(function(resolve, reject) {
    request(API_TOWER_LIST, function(error, response, body) {
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
    request(API_TOWER_STATISTICS, function(error, response, body) {
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
      }
    })
  });

});


router.get('', function(req, res) {
  res.send('Api route');
});


module.exports = router;
