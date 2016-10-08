angular.module('towersApp')
  .controller('LeaderboardController', ['$scope', 'TowerFactory', 'MoonFactory', '$state', 'toastr', function($scope, TowerFactory, MoonFactory, $state, toastr) {
    var vm = this;

    vm.state = {
      view: $state.current.name,
    };
    vm.leaderboard = [];
    vm.selectedNewMoon = {};
    vm.orderBy = 'claim_count';
    vm.reverseOrder = false;
    vm.setSort = setSort;
    vm.selectNewMoon = selectNewMoon;

    init();

    function init() {
      switch (vm.state.view) {

        case 'app.leaderboard.new-moons':
          loadNewMoons();
          getLeaderboardMoons();
          break;

        case 'app.leaderboard.main':
        default:
          getLeaderboard();

      }
    }

    $scope.$watch(function() {
      return $state.current.name;
    }, function(newVal, oldVal) {
      vm.state.view = newVal;
      init();
    });

    function setSort(property, asFloat) {
      sort(property, asFloat);
    };

    function sort(property, asFloat) {
      if (property == vm.orderBy) vm.reverseOrder = !vm.reverseOrder;

      // Parse as float if needed
      if (asFloat) {
        vm.leaderboard.map(function(obj) {
          obj[property] = parseFloat(obj[property]);
          return obj;
        });
      }

      vm.orderBy = property;
    }

    function getLeaderboard() {
      TowerFactory.getLeaderboard()
        .then(function(response) {
          vm.leaderboard = response.data;
        })
        .then(function() {
          sort(vm.orderBy, true);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function loadNewMoons() {
      MoonFactory.getNewMoons()
        .then(function(response) {
          var today = new Date();
          var date;
          var minimumDate = new Date('2015-08-15')            // Only get new moons after this date
          var newMoons = response.data.filter(function(obj) {
            date = new Date(obj.iso8601);
            return today > date && date > minimumDate;
          });

          vm.newMoons = newMoons;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function getLeaderboardMoons(date) {
      if (!date) {
        vm.leaderboard = [];
        return false;
      }

      TowerFactory.getLeaderboardMoons(date)
        .then(function(response) {
          if (response.data.response) {
            if (response.data.response.statusCode == 404) {
              vm.state.error = response.data.response.body.error;
              toastr.error(response.data.response.body.error.message);
              vm.leaderboard = [];
            }
          }
          else {
            vm.leaderboard = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function selectNewMoon() {
      if (vm.selectedNewMoon) {
        getLeaderboardMoons(vm.selectedNewMoon.iso8601);
      }
    }

  }]);
