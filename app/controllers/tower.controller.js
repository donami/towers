angular.module('towersApp')
  .controller('TowerController', ['$scope', 'GraphFactory', '$stateParams', function($scope, GraphFactory, $stateParams) {

    $scope.tower = {};

    findTowerById($stateParams.id);

    function findTowerById(id) {
      GraphFactory.findById(id)
        .then(function(response) {
          $scope.tower = response.data;
        }, function(error) {
          $scope.status = 'Unable to load tower: ' + error.message;
        });
    }

  }]);
