(function() {
  'use strict';

  angular
    .module('towersApp')
    .factory('TowerFactory', TowerFactory);

  TowerFactory.$inject = ['$http', 'DataCache'];
  function TowerFactory($http, DataCache) {

    var urlBase = '/api/towers';
    var dataCache = DataCache.get();

    var factory = {
      getTowers: getTowers,
      findById: findById,
      getLeaderboard: getLeaderboard,
      getLeaderboardTowerBuilder: getLeaderboardTowerBuilder,
      getLeaderboardMoons: getLeaderboardMoons,
      getStats: getStats,
      getTopLeaderboard: getTopLeaderboard,
      getFirstInCountry: getFirstInCountry,
    };

    return factory;

    function getTowers(startDate, endDate) {
      if (startDate && endDate) {
        return $http.get('/api/tower/all/' + startDate + '/' + endDate, { cache: dataCache });
      }
      return $http.get('/api/tower/all', { cache: dataCache });
    }

    function findById(id) {
      return $http.get('/api/tower/' + id, { cache: dataCache });
    }

    function getLeaderboard(startDate, endDate) {
      if (startDate && endDate) {
        return $http.get('/api/leaderboard/' + startDate + '/' + endDate, { cache: dataCache });
      }
      return $http.get('/api/leaderboard', { cache: dataCache });
    }

    function getLeaderboardTowerBuilder(startDate, endDate) {
      if (startDate && endDate) {
        return $http.get('/api/leaderboard/tower-builder/' + startDate + '/' + endDate, { cache: dataCache });
      }
      return $http.get('/api/leaderboard/tower-builder', { cache: dataCache });
    }

    function getLeaderboardMoons(date) {
      if (!date)
        return false;

      return $http.get('/api/leaderboard/moons/' + date, { cache: dataCache });
    }

    function getStats(startDate, endDate) {
      if (startDate && endDate) {
        return $http.get('/api/tower/stats/' + startDate + '/' + endDate, { cache: dataCache });
      }
      return $http.get('/api/tower/stats', { cache: dataCache });
    }

    function getTopLeaderboard() {
      return $http.get('/api/leaderboard/top', { cache: dataCache });
    }

    function getFirstInCountry() {
      return $http.get('/api/hall-of-fame/first-tower', { cache: dataCache });
    }

  }

})();
