var express = require('express');
var router = express.Router();
var request = require('request-promise');
var db = require('./../db');
var api = require('./_const');

var achievementRoutes = require('./achievements');
var meRoutes = require('./me');
var towerRoutes = require('./tower');
var leaderboardRoutes = require('./leaderboard');
var hallOfFameRoutes = require('./halloffame');
var newMoonsRoutes = require('./newMoons');

router.get('/user-info/:key', function(req, res) {
  var options = {
    uri: api.API_ME + '?apiKey=' + req.params.key,
    json: true,
  };

  request(options)
    .then(function(data) {
      return res.json(data);
    }, function(error) {
      return res.json(error);
    });
});

router.get('/verify-key/:key', function(req, res) {
  var options = {
    uri: api.API_PERSONAL + '?apiKey=' + req.params.key + '&start=2000-01-01&end=2020-01-01',
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
    return res.json({ message: 'Error: No cookies set'});
  }
  next();
});

router.use('/tower', towerRoutes);
router.use('/achievement', achievementRoutes);
router.use('/me', meRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/hall-of-fame', hallOfFameRoutes);
router.use('/new-moons', newMoonsRoutes);

router.get('/', function(req, res) {
  res.send('Api route');
});

module.exports = router;
