angular.module('towersApp')
  .controller('MeController', ['$scope', '$cookies', 'MeFactory', 'TowerFactory',
  function($scope, $cookies, MeFactory, TowerFactory) {

    $scope.userApiKey = $cookies.get('userApiKey');

    $scope.claimedTowers = [];

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.lastClaimedTower = {
      tower_id: 0,
      info: [],
      stats: []
    };

    MeFactory.getClaims()
      .then(function(response) {
        $scope.claimedTowers = response.data;
        $scope.totalItems = response.data.length;

      }, function(error) {
        console.log(error);
      });

    // Get the latest claimed tower
    MeFactory.getLatestClaimedTower()
      .then(function(response) {
        var claimedTower = {};

        var towerId = response.data[0].lastClaimedTowerId;

        var info = response.data[1].find(function(obj) {
          return obj.tower_id == towerId;
        });

        var stats = response.data[2].find(function(obj) {
          return obj.tower_id == towerId;
        });

        claimedTower.tower_id = towerId;
        claimedTower.info = info;
        claimedTower.stats = stats;

        $scope.lastClaimedTower = claimedTower;
      }, function(error) {
        console.log(error);
      });

    // Filter for paginating the results
    $scope.paginate = function(value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.claimedTowers.indexOf(value);
      return (begin <= index && index < end);
    };

  }]);
