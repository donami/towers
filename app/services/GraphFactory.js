'use strict';

angular.module('towersApp')
  .factory('GraphFactory', ['$http', function($http) {

      var urlBase = '/api/towers';

      var GraphFactory = {};

      GraphFactory.getTowers = function() {
        return $http.get('/api/tower/all');
      }

      GraphFactory.findById = function(id) {
        return $http.get('/api/tower/' + id);
      }

      GraphFactory.getLeaderboard = function() {
        return $http.get('/api/leaderboard');
      }

      return GraphFactory;
  }]);
