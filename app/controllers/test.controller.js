angular.module('towersApp')
  .controller('testCtrl', ['$scope', 'TowerFactory', '$q', function ($scope, TowerFactory, $q) {
    // $scope.labels = [
    //   1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    // ];
    // $scope.series = ['Takeovers'];
    //
    // $scope.data = [
    //   [65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 8]
    // ];

    $scope.claimCountLabels = [];
    $scope.claimCountSeries = ['Top ten claim count'];
    $scope.claimCountData = [];

    $scope.geldCollectedLabels = [];
    $scope.geldCollectedSeries = ['Most geld collected'];
    $scope.geldCollectedData = [];

    var deferred = $q.defer();

    deferred.promise
      .then(function(response) {
        getTopClaims(response.data);
        getMostGeldCollected(response.data);
      }, function(error) {
        console.log(error);
      });


    TowerFactory.getLeaderboard()
      .then(function(response) {
        deferred.resolve({
          data: response.data
        });
      }, function(error) {
        console.log(error);
      });

    // Get data for players with most claims
    function getTopClaims(data) {
      // Sort based on claim count
      var sortedData = data.sort(function(a, b) {
        return b.claim_count - a.claim_count;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      sortedData.forEach(function(obj) {
        $scope.claimCountData.push(obj.claim_count);
        $scope.claimCountLabels.push(obj.player_alias);
      })
    }

    // Get the data for players collecting most geld
    function getMostGeldCollected(data) {
      // Sort based on geld collected count
      var sortedData = data.sort(function(a, b) {
        return b.geld_collected - a.geld_collected;
      });

      // Get only the first ten of the sorted data
      sortedData = sortedData.slice(0, 10);

      sortedData.forEach(function(obj) {
        $scope.geldCollectedData.push(obj.geld_collected);
        $scope.geldCollectedLabels.push(obj.player_alias);
      })
    }

  }]);
