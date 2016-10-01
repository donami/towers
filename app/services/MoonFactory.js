'use strict';

angular.module('towersApp')
  .factory('MoonFactory', ['$http', 'DataCache', function($http, DataCache) {

      var urlBase = '/api/new-moons';

      var MeFactory = {};

      var dataCache = DataCache.get();

      MeFactory.getNewMoons = function() {
        return $http.get(urlBase, { cache: dataCache });
      };

      return MeFactory;
  }]);
