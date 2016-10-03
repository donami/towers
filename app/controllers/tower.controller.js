angular.module('towersApp')
  .controller('TowerController', ['$scope', 'TowerFactory', '$stateParams', function($scope, TowerFactory, $stateParams) {

    $scope.state = {
      loading: true,
    };

    findTowerById($stateParams.id);

    function findTowerById(id) {
      TowerFactory.findById(id)
        .then(function(response) {
          $scope.state.loading = false;
          $scope.tower = response.data;
        }, function(error) {
          $scope.state.loading = false;
          $scope.error = {
            type: 'Unable to load tower: ' + error.data.message,
            message: 'This tower is missing data',
          };
        });
    }

  }]);
