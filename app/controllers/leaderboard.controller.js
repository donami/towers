angular.module('towersApp')
  .controller('LeaderboardController', ['$scope', 'TowerFactory', function($scope, TowerFactory) {

    $scope.leaderboard = [];

    $scope.orderBy = 'claim_count';
    $scope.reverseOrder = false;

    getLeaderboard();

    $scope.setSort = function(property, asFloat) {
      sort(property, asFloat);
    };

    function sort(property, asFloat) {
      if (property == $scope.orderBy) $scope.reverseOrder = !$scope.reverseOrder;

      // Parse as float if needed
      if (asFloat) {
        $scope.leaderboard.map(function(obj) {
          obj[property] = parseFloat(obj[property]);
          return obj;
        });
      }

      $scope.orderBy = property;
    }

    function getLeaderboard() {
      TowerFactory.getLeaderboard()
        .then(function(response) {
          $scope.leaderboard = response.data;
        })
        .then(function() {
          sort($scope.orderBy, true);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }]);
