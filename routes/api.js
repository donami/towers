var express = require('express');
var router = express.Router();
var request = require('request-promise');

// const API_TOWER_LIST = 'https://play.2good.com/api/v1/public/towers/metadata?apiKey=G7gL2P8xidoaGh4qTqY5CVL0nPSFyAuO&start=2016-01-01&end=2017-01-01';
const API_TOWER_LIST = 'https://play.2good.com/api/v1/public/towers/metadata';
// const API_TOWER_STATISTICS = 'https://play.2good.com/api/v1/public/towers/statistics?apiKey=G7gL2P8xidoaGh4qTqY5CVL0nPSFyAuO&start=2016-01-01&end=2017-01-01';
const API_TOWER_STATISTICS = 'https://play.2good.com/api/v1/public/towers/statistics';
// const API_LEADERBOARD = 'https://play.2good.com/api/v1/public/leaderboards/claims?apiKey=G7gL2P8xidoaGh4qTqY5CVL0nPSFyAuO&start=2016-01-01&end=2017-01-01';
const API_LEADERBOARD = 'https://play.2good.com/api/v1/public/leaderboards/claims';
// const API_HALL_OF_FAME_FIRST_TOWER = 'https://play.2good.com/api/v1/public/hall-of-fame/first-tower/country?apiKey=G7gL2P8xidoaGh4qTqY5CVL0nPSFyAuO';
const API_HALL_OF_FAME_FIRST_TOWER = 'https://play.2good.com/api/v1/public/hall-of-fame/first-tower/country';
// const API_PERSONAL = 'https://play.2good.com/api/v1/public/claims?apiKey=9zEUDsWNqr0jCQ0MbIad8QgWH0giPxF4&start=2016-01-01&end=2017-01-01';
const API_PERSONAL = 'https://play.2good.com/api/v1/public/claims';
const API_NEW_MOONS = 'https://play.2good.com/assets/new-moons.min.json';
const API_ME = 'https://play.2good.com/api/v1/public/me'; // Info about player, including last claimed tower


router.get('/verify-key/:key', function(req, res) {
  var options = {
    uri: API_PERSONAL + '?apiKey=' + req.params.key + '&start=2016-01-01&end=2017-01-01',
    json: true,
  };

  request(options)
    .then(function(data) {
      return res.json(data);
    }, function(error) {
      return res.status(403).send('Invalid credentials');
    });
});

// The routes should only be avaible if the user
// has a set cookie with its personal api key
router.use(function(req, res, next) {
  if (!req.cookies.userApiKey) {
    res.json([]);
  }
  next();
});

router.get('/new-moons', function(req, res) {
  var options = {
    uri: API_NEW_MOONS,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

router.get('/hall-of-fame/first-tower', function(req, res) {
  var options = {
    uri: API_HALL_OF_FAME_FIRST_TOWER + '?apiKey=' + req.cookies.userApiKey,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

// Get leaderboard
router.get('/leaderboard/:startDate?/:endDate?', function(req, res) {
  var options = {
    uri: API_LEADERBOARD + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01',
    json: true,
  };

  if (req.params.startDate && req.params.endDate) {
    var options = {
      uri: API_LEADERBOARD + '?apiKey=' + req.cookies.userApiKey + '&start=' + req.params.startDate + '&end=' + req.params.endDate,
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

// Get a list of all towers
router.get('/tower/all', function(req, res) {
  var options = {
    uri: API_TOWER_LIST + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01',
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(error) {
      res.json(error);
    });
});

// Get statistics for towers
router.get('/tower/stats', function(req, res) {
  var options = {
    uri: API_TOWER_STATISTICS + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01',
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
    request(API_TOWER_LIST + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01', function(error, response, body) {
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
    request(API_TOWER_STATISTICS + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01', function(error, response, body) {
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

// Get latest claimed tower
router.get('/me/latest-claim', function(req, res) {

  // Get personal info
  var mePromise = request({uri: API_ME + '?apiKey=' + req.cookies.userApiKey, json:true });

  // Get metadata
  var metaPromise = request({uri: API_TOWER_LIST + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01', json:true });

  // Get statistics
  var statsPromise = request({uri: API_TOWER_STATISTICS + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01', json:true });

  Promise.all([mePromise, metaPromise, statsPromise])
    .then(function(response) {
      res.json(response);
    })
    .catch(function(error) {
      res.json(error);
    });

});

// Display personal stats
router.get('/me', function(req, res) {
  var options = {
    uri: API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=2016-01-01&end=2017-01-01',
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(error) {
      res.json(error);
    });
});


router.get('', function(req, res) {
  res.send('Api route');
});


module.exports = router;
