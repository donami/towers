'use strict';

angular.module('towersApp')
  .factory('MeFactory', ['$http', 'DataCache', function($http, DataCache) {

      var urlBase = '/api/me';

      var MeFactory = {};

      var dataCache = DataCache.get();

      MeFactory.getClaims = function(startDate, endDate) {
        if (startDate && endDate) {
          return $http.get(urlBase + '/' + startDate + '/' + endDate, { cache: dataCache });
        }
        return $http.get(urlBase, { cache: dataCache });
      };

      MeFactory.getLatestClaimedTower = function() {
        return $http.get(urlBase + '/latest-claim');
      };

      return MeFactory;
  }]);
