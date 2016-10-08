(function() {
  'use strict';

  angular
    .module('towersApp')
    .directive('hallOfFame', hallOfFame);

  function hallOfFame() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'templates/hall-of-fame.html',
    };
  }
  
})();
