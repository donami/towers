angular.module('towersApp')
  .controller('HomeController', ['$scope', 'TowerFactory', function($scope, TowerFactory) {

    $scope.towers = [];

    initTowers();

    function initTowers() {
      TowerFactory.getTowers()
        .then(function(response) {
          var data = response.data.slice(1,10);              // TODO: should not be sliced, obviously. Find a way to display towers. All towers in a list may be too much.

          $scope.towers = data;
        }, function(error) {
          $scope.status = 'Unable to load towers: ' + error.message;
        });
    }

  }]);
