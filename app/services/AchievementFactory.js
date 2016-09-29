angular.module('towersApp')
  .factory('AchievementFactory', ['$http', function($http) {

    var AchievementFactory = {};

    AchievementFactory.getAchievements = function() {
      return $http.get('/api/achievement');
    };

    // Scan for new achievements
    AchievementFactory.refresh = function() {
      return $http.get('/api/achievement/refresh');
    }

    return AchievementFactory;

  }]);
