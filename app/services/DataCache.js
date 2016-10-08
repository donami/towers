(function() {
  'use strict';

  angular
    .module('towersApp')
    .factory('DataCache', DataCache);

  DataCache.$inject = ['CacheFactory'];
  function DataCache(CacheFactory) {
    var factory = {
      get: get,
    };

    return factory;

    function get() {
      if (!CacheFactory.get('dataCache')) {
        CacheFactory.createCache('dataCache', {
          deleteOnExpire: 'aggressive',
          cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour.
          recycleFreq: 60000,
          storageMode: 'localStorage' // This cache will use `localStorage`.
        });
      }

      return CacheFactory.get('dataCache');
    }
  }

})();
