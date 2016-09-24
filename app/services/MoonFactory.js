'use strict';

angular.module('towersApp')
  .factory('MoonFactory', ['$http', function($http) {

      var urlBase = '/api/new-moons';

      var MeFactory = {};

      MeFactory.getNewMoons = function() {
        return $http.get(urlBase);
      };

      return MeFactory;
  }]);
