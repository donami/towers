angular.module('towersApp')
  .controller('testCtrl', ['$scope', 'TowerFactory', function ($scope, TowerFactory) {
    $scope.labels = [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    ];
    $scope.series = ['Takeovers'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 8]
    ];

    getTopLeaderboard();

    $scope.claimCountLabels = [];
    $scope.claimCountSeries = ['Top ten claim count'];
    $scope.claimCountData = [];


    function getTopLeaderboard() {
      TowerFactory.getTopLeaderboard()
        .then(function(response) {
          response.data.forEach(function(obj) {
            $scope.claimCountData.push(obj.claim_count);
            $scope.claimCountLabels.push(obj.player_alias);
          });
        }, function(error) {
          console.log(error);
        });
    }
  }]);
