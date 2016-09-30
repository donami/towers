angular.module('towersApp')
  .directive('graph', [function() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'templates/graph.html',
      scope: {
        data: '=',
        labels: '=',
        series: '=',
        options: '=',
        datasetoverride: '=',
      },
      link: function(scope, elem, attrs) {
        scope.title = attrs.graphTitle;
      }
    };
  }]);
