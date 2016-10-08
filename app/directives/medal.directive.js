(function() {
  'use strict';

  angular
    .module('towersApp')
    .directive('medal', medal);

  function medal() {
    return {
      restrict: 'AE',
      template: '<div class="medal"></div>',
      replace: 'true',
      scope: {
        place: '='
      },
      link: function(scope, elem, attrs) {
        switch (scope.place) {
          case 1: elem.addClass('gold'); break;
          case 2: elem.addClass('silver'); break;
          case 3: elem.addClass('bronze'); break;
          default:
        }
      }
    };
  }

})();
