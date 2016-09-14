angular.module('towersApp')
  .controller('LeaderboardController', ['$scope', 'GraphFactory', function($scope, GraphFactory) {

    $scope.leaderboard = [];

    getLeaderboard();

    function getLeaderboard() {
      GraphFactory.getLeaderboard()
        .then(function(response) {
          $scope.leaderboard = response.data;
        }, function(error) {
          console.log(error);
        });
    }

  }]);
