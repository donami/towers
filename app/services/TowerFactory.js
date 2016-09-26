'use strict';

angular.module('towersApp')
  .factory('TowerFactory', ['$http', function($http) {

      var urlBase = '/api/towers';

      var TowerFactory = {};

      TowerFactory.getTowers = function(startDate, endDate) {
        if (startDate && endDate) {
          return $http.get('/api/tower/all/' + startDate + '/' + endDate);
        }
        return $http.get('/api/tower/all');
      };

      TowerFactory.findById = function(id) {
        return $http.get('/api/tower/' + id);
      };

      TowerFactory.getLeaderboard = function(startDate, endDate) {
        if (startDate && endDate) {
          return $http.get('/api/leaderboard/' + startDate + '/' + endDate);
        }
        return $http.get('/api/leaderboard');
      };

      TowerFactory.getStats = function(startDate, endDate) {
        if (startDate && endDate) {
          return $http.get('/api/tower/stats/' + startDate + '/' + endDate);
        }
        return $http.get('/api/tower/stats');
      };

      TowerFactory.getTopLeaderboard = function() {
        return $http.get('/api/leaderboard/top');
      };

      TowerFactory.getFirstInCountry = function() {
        return $http.get('/api/hall-of-fame/first-tower');
      };

      return TowerFactory;
  }]);
