'use strict';

angular.module('towersApp')
  .factory('TowerFactory', ['$http', function($http) {

      var urlBase = '/api/towers';

      var TowerFactory = {};

      TowerFactory.getTowers = function() {
        return $http.get('/api/tower/all');
      }

      TowerFactory.findById = function(id) {
        return $http.get('/api/tower/' + id);
      }

      TowerFactory.getLeaderboard = function() {
        return $http.get('/api/leaderboard');
      }

      TowerFactory.getTopLeaderboard = function() {
        return $http.get('/api/leaderboard/top');
      }

      return TowerFactory;
  }]);
