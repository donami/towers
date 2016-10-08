(function() {
  'use strict';

  angular
    .module('towersApp')
    .directive('graph', graph);
    
  graph.$inject = ['$compile'];
  function graph($compile) {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'templates/graph.html',
      scope: {
        type: '=',
        data: '=',
        labels: '=',
        series: '=',
        options: '=',
        graphTitle: '=',
        datasetoverride: '=',
      },
      link: function(scope, elem, attrs) {
        var canvas = elem.find('canvas');
        switch (scope.type) {
          case 'bar':
            canvas.addClass('chart-bar');
            break;
          case 'line':
            canvas.addClass('chart-line');
            break;
          default:
            canvas.addClass('chart-bar');
        }
        // Recompile
        $compile(elem)(scope);
      }
    };
  }

})();
