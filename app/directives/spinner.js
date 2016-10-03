angular.module('towersApp')
  .directive('spinner', [function() {
    return {
      restrict: 'AE',
      replace: 'true',
      template: '<img src="/assets/loading.png" class="glyphicon spinner" alt="Loading">',
    };
  }]);
