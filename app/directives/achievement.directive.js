angular.module('towersApp')
  .directive('achievement', [function() {

    return {
      restrict: 'AE',
      templateUrl: 'templates/achievement.html',
      replace: 'true',
      scope: {
        data: '='
      },
      link: function(scope, elem, attrs) {
        if (scope.data.createdAt) {
          elem.addClass('achieved');
        }
      }
    };

  }]);
