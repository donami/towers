// TowerFactory.$inject = ['$http', 'DataCache'];
export default class TowerFactory {

  constructor($http, DataCache) {
    this.$http = $http;
    this.urlBase = '/api/towers';
    this.dataCache = DataCache.get();
  }

  getTowers(startDate, endDate) {
    if (startDate && endDate) {
      return this.$http.get('/api/tower/all/' + startDate + '/' + endDate, { cache: this.dataCache });
    }
    return this.$http.get('/api/tower/all', { cache: this.dataCache });
  }

  findById(id) {
    return this.$http.get('/api/tower/' + id, { cache: this.dataCache });
  }

  getLeaderboard(startDate, endDate) {
    if (startDate && endDate) {
      return this.$http.get('/api/leaderboard/' + startDate + '/' + endDate, { cache: this.dataCache });
    }
    return this.$http.get('/api/leaderboard', { cache: this.dataCache });
  }

  getLeaderboardTowerBuilder(startDate, endDate) {
    if (startDate && endDate) {
      return this.$http.get('/api/leaderboard/tower-builder/' + startDate + '/' + endDate, { cache: this.dataCache });
    }
    return this.$http.get('/api/leaderboard/tower-builder', { cache: this.dataCache });
  }

  getLeaderboardMoons(date) {
    if (!date)
      return false;

    return this.$http.get('/api/leaderboard/moons/' + date, { cache: this.dataCache });
  }

  getStats(startDate, endDate) {
    if (startDate && endDate) {
      return this.$http.get('/api/tower/stats/' + startDate + '/' + endDate, { cache: this.dataCache });
    }
    return this.$http.get('/api/tower/stats', { cache: this.dataCache });
  }

  getTopLeaderboard() {
    return this.$http.get('/api/leaderboard/top', { cache: this.dataCache });
  }

  getFirstInCountry() {
    return this.$http.get('/api/hall-of-fame/first-tower', { cache: this.dataCache });
  }

}
