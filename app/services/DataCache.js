export default class DataCache {
  constructor(CacheFactory) {
    this.CacheFactory = CacheFactory;
  }

  get() {
    if (!this.CacheFactory.get('dataCache')) {
      this.CacheFactory.createCache('dataCache', {
        deleteOnExpire: 'aggressive',
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour.
        recycleFreq: 60000,
        storageMode: 'localStorage' // This cache will use `localStorage`.
      });
    }

    return this.CacheFactory.get('dataCache');
  }
}
