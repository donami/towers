(function() {
  'use strict';

  angular
    .module('towersApp')
    .factory('MoonFactory', MoonFactory);

  MoonFactory.$inject = ['$http', 'DataCache'];
  function MoonFactory($http, DataCache) {

    var urlBase = '/api/new-moons';
    var dataCache = DataCache.get();

    var factory = {
      getNewMoons: getNewMoons,
    };

    return factory;

    function getNewMoons() {
      return $http.get(urlBase, { cache: dataCache });
    }

  }

})();
