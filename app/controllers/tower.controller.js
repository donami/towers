angular.module('towersApp')
  .controller('TowerController', ['$scope', 'TowerFactory', '$stateParams', 'MapService', function($scope, TowerFactory, $stateParams, MapService) {

    $scope.state = {
      loading: true,
    };

    findTowerById($stateParams.id);

    function findTowerById(id) {
      TowerFactory.findById(id)
        .then(function(response) {
          $scope.state.loading = false;
          $scope.tower = response.data;

          return MapService.getMap($scope.tower.formatted_address);
        })
        .then(function(response) {
          $scope.map = response.map;
        })
        .catch(function(error) {
          $scope.state.loading = false;
          $scope.error = {
            type: 'Unable to load tower: ' + error.data.message,
            message: 'This tower is missing data',
          };
        });
    }

  }]);
