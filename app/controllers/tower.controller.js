angular.module('towersApp')
  .controller('TowerController', ['$scope', 'TowerFactory', '$stateParams', function($scope, TowerFactory, $stateParams) {

    $scope.tower = {};

    findTowerById($stateParams.id);

    function findTowerById(id) {
      TowerFactory.findById(id)
        .then(function(response) {
          $scope.tower = response.data;
        }, function(error) {
          $scope.status = 'Unable to load tower: ' + error.message;
        });
    }

  }]);
