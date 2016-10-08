angular.module('towersApp')
  .controller('TowerController', ['$scope', 'TowerFactory', 'MeFactory', '$state', '$stateParams', 'MapService', function($scope, TowerFactory, MeFactory, $state, $stateParams, MapService) {
    var vm = this;

    vm.state = {
      loading: true,
      view: $state.current.name,
    };

    $scope.$watch(function() {
      return $state.current.name;
    }, function(newVal, oldVal) {
      vm.state.view = newVal;
    });

    findTowerById($stateParams.id);

    function findTowerById(id) {
      TowerFactory.findById(id)
        .then(function(response) {
          vm.state.loading = false;
          vm.tower = response.data;

          return MapService.getMap(vm.tower.formatted_address);
        })
        .then(function(response) {
          vm.map = response.map;
          getLog();
        })
        .catch(function(error) {
          vm.state.loading = false;
          vm.error = {
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

          vm.log = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }]);
