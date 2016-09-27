angular.module('towersApp')
  .directive('hallOfFame', [function() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'templates/hall-of-fame.html',
    };
  }]);
