angular.module('towersApp').factory('DataCache', ['CacheFactory', function(CacheFactory) {
  var DataCache = {};

  DataCache.get = function() {
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

  return DataCache;
}]);
