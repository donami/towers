export default class MoonFactory {

  constructor($http, DataCache) {
    this.$http = $http;
    this.urlBase = '/api/new-moons';
    this.dataCache = DataCache.get();
  }

  getNewMoons() {
    return this.$http.get(this.urlBase, { cache: this.dataCache });
  }

}
