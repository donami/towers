angular.module('towersApp')
  .controller('HomeController', ['$scope', 'TowerFactory', function($scope, TowerFactory) {

    $scope.towers = [];

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    initTowers();

    function initTowers() {
      TowerFactory.getTowers()
        .then(function(response) {
          var data = response.data;

          $scope.towers = data;
          $scope.totalItems = response.data.length;
        }, function(error) {
          $scope.status = 'Unable to load towers: ' + error.message;
        });
    }

    // Filter for paginating the results
    $scope.paginate = function(value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.towers.indexOf(value);
      return (begin <= index && index < end);
    };

  }]);
