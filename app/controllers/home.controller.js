angular.module('towersApp')
  .controller('HomeController', ['$scope', 'TowerFactory', '$filter', function($scope, TowerFactory, $filter) {

    $scope.towers = [];

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.orderBy = 'created_on';
    $scope.reverse = false;

    initTowers();

    function initTowers() {
      TowerFactory.getTowers()
        .then(function(response) {
          var data = response.data;

          $scope.towers = data;
          $scope.totalItems = response.data.length;
          $scope.towers = $filter('orderBy')($scope.towers, $scope.orderBy, $scope.reverse);
        }, function(error) {
          $scope.status = 'Unable to load towers: ' + error.message;
        });
    }

    // Sort the table
    $scope.sortBy = function(property) {
      $scope.reverse = !$scope.reverse;
      $scope.orderBy = property;
      $scope.towers = $filter('orderBy')($scope.towers, $scope.orderBy, $scope.reverse);
    };

    // Filter for paginating the results
    $scope.paginate = function(value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.towers.indexOf(value);
      return (begin <= index && index < end);
    };

  }]);
