angular.module('towersApp')
  .controller('LeaderboardController', ['$scope', 'TowerFactory', function($scope, TowerFactory) {

    $scope.leaderboard = [];

    getLeaderboard();

    function getLeaderboard() {
      TowerFactory.getLeaderboard()
        .then(function(response) {
          $scope.leaderboard = response.data;
        }, function(error) {
          console.log(error);
        });
    }

  }]);
