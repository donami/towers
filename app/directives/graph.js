angular.module('towersApp')
  .directive('graph', ['$compile', function($compile) {
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
        datasetoverride: '=',
      },
      link: function(scope, elem, attrs) {
        scope.title = attrs.graphTitle;

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
  }]);
