'use strict';

angular.module('towersApp')
  .factory('TowerFactory', ['$http', 'DataCache', function($http, DataCache) {

      var urlBase = '/api/towers';

      var TowerFactory = {};

      var dataCache = DataCache.get();

      TowerFactory.getTowers = function(startDate, endDate) {
        if (startDate && endDate) {
          return $http.get('/api/tower/all/' + startDate + '/' + endDate, { cache: dataCache });
        }
        return $http.get('/api/tower/all', { cache: dataCache });
      };

      TowerFactory.findById = function(id) {
        return $http.get('/api/tower/' + id, { cache: dataCache });
      };

      TowerFactory.getLeaderboard = function(startDate, endDate) {
        if (startDate && endDate) {
          return $http.get('/api/leaderboard/' + startDate + '/' + endDate, { cache: dataCache });
        }
        return $http.get('/api/leaderboard', { cache: dataCache });
      };

      TowerFactory.getStats = function(startDate, endDate) {
        if (startDate && endDate) {
          return $http.get('/api/tower/stats/' + startDate + '/' + endDate, { cache: dataCache });
        }
        return $http.get('/api/tower/stats', { cache: dataCache });
      };

      TowerFactory.getTopLeaderboard = function() {
        return $http.get('/api/leaderboard/top', { cache: dataCache });
      };

      TowerFactory.getFirstInCountry = function() {
        return $http.get('/api/hall-of-fame/first-tower', { cache: dataCache });
      };

      return TowerFactory;
  }]);
