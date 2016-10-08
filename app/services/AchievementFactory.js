(function() {
  'use strict';

  angular
    .module('towersApp')
    .factory('AchievementFactory', AchievementFactory);

  AchievementFactory.$inject = ['$http'];
  function AchievementFactory($http) {

    var factory = {
      getAchievements: getAchievements,
      refresh: refresh,
    };

    return factory;

    function getAchievements() {
      return $http.get('/api/achievement');
    }

    // Scan for new achievements
    function refresh() {
      return $http.get('/api/achievement/refresh');
    }

  }

})();
