(function() {
  'use strict';

  angular
    .module('towersApp')
    .factory('MeFactory', MeFactory);

  MeFactory.$inject = ['$http', 'DataCache'];
  function MeFactory($http, DataCache) {

    var urlBase = '/api/me';
    var dataCache = DataCache.get();

    var factory = {
      getClaims: getClaims,
      getLatestClaimedTower: getLatestClaimedTower,
    };

    return factory;

    function getClaims(startDate, endDate) {
      if (startDate && endDate) {
        return $http.get(urlBase + '/' + startDate + '/' + endDate, { cache: dataCache });
      }
      return $http.get(urlBase, { cache: dataCache });
    }

    function getLatestClaimedTower() {
      return $http.get(urlBase + '/latest-claim');
    }

  }

})();
