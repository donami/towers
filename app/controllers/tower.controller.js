(function() {
  'use strict';

  angular
    .module('towersApp')
    .controller('TowerController', TowerController);

  TowerController.$inject = ['$scope', 'TowerFactory', 'MeFactory', '$state', '$stateParams', 'MapService', '$exceptionHandler'];
  function TowerController($scope, TowerFactory, MeFactory, $state, $stateParams, MapService, $exceptionHandler) {
    var vm = this;

    vm.state = {
      loading: true,
      view: $state.current.name,
    };

    init();

    $scope.$watch(function() {
      return $state.current.name;
    }, function(newVal, oldVal) {
      vm.state.view = newVal;
    });

    function init() {
      findTower($stateParams.id);
      getLog($stateParams.id);
    }

    function findTower(id) {
      TowerFactory.findById(id)
        .then(function(response) {
          vm.state.loading = false;
          vm.tower = response.data;

          return MapService.getMap(vm.tower.formatted_address);
        })
        .then(function(response) {
          vm.map = response.map;
        })
        .catch(function(error) {
          vm.state.loading = false;

          if (error.status) {
            if (error.status === 404) {
              vm.error = {
                type: 'Unable to load tower: ' + error.data.message,
                message: 'This tower is missing data',
              };
            }
          }
        });
    }

    function getLog(id) {
      return MeFactory.getClaims()
        .then(function(response) {
          // Get claims on this tower
          var data = response.data.filter(function(obj) {
            return obj.tower_id == id;
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
  }

})();
