export default class AchievementFactory {

  constructor($http) {
    this.$http = $http;
  }

  getAchievements() {
    return this.$http.get('/api/achievement');
  }

  // Scan for new achievements
  refresh() {
    return this.$http.get('/api/achievement/refresh');
  }

}
