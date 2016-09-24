'use strict';

angular.module('towersApp')
  .factory('MeFactory', ['$http', function($http) {

      var urlBase = '/api/me';

      var MeFactory = {};

      MeFactory.getClaims = function() {
        return $http.get(urlBase);
      };

      MeFactory.getLatestClaimedTower = function() {
        return $http.get(urlBase + '/latest-claim');
      };

      return MeFactory;
  }]);
