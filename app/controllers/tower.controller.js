angular.module('towersApp')
  .controller('TowerController', ['$scope', 'TowerFactory', 'MeFactory', '$stateParams', 'MapService', function($scope, TowerFactory, MeFactory, $stateParams, MapService) {

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
          getLog();
        })
        .catch(function(error) {
          $scope.state.loading = false;
          $scope.error = {
            type: 'Unable to load tower: ' + error.data.message,
            message: 'This tower is missing data',
          };
        });
    }

    function getLog() {
      MeFactory.getClaims()
        .then(function(response) {
          // Get claims on this tower
          var data = response.data.filter(function(obj) {
            return obj.tower_id == $stateParams.id;
          });

          // Sort the data
          data.sort(function(a, b) {
            if (a.claimed_on > b.claimed_on) return -1;
            if (a.claimed_on < b.claimed_on) return 1;

            return 0;
          });

          $scope.log = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }]);
