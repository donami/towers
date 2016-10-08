(function() {
  'use strict';

  angular
    .module('towersApp')
    .directive('spinner', spinner);

  function spinner() {
    return {
      restrict: 'AE',
      replace: 'true',
      template: '<img src="/assets/loading.png" class="glyphicon spinner" alt="Loading">',
    };
  }

})();
