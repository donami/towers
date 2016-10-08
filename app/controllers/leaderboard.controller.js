angular.module('towersApp')
  .controller('LeaderboardController', ['$scope', 'TowerFactory', 'MoonFactory', '$state', 'toastr', function($scope, TowerFactory, MoonFactory, $state, toastr) {

    $scope.state = {
      view: $state.current.name,
    };

    $scope.leaderboard = [];
    $scope.selectedNewMoon = {};

    $scope.orderBy = 'claim_count';
    $scope.reverseOrder = false;

    init();

    function init() {
      switch ($scope.state.view) {

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
      $scope.state.view = newVal;
      init();
    });

    $scope.setSort = function(property, asFloat) {
      sort(property, asFloat);
    };

    function sort(property, asFloat) {
      if (property == $scope.orderBy) $scope.reverseOrder = !$scope.reverseOrder;

      // Parse as float if needed
      if (asFloat) {
        $scope.leaderboard.map(function(obj) {
          obj[property] = parseFloat(obj[property]);
          return obj;
        });
      }

      $scope.orderBy = property;
    }

    function getLeaderboard() {
      TowerFactory.getLeaderboard()
        .then(function(response) {
          $scope.leaderboard = response.data;
        })
        .then(function() {
          sort($scope.orderBy, true);
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

          $scope.newMoons = newMoons;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function getLeaderboardMoons(date) {
      if (!date) {
        $scope.leaderboard = [];
        return false;
      }

      TowerFactory.getLeaderboardMoons(date)
        .then(function(response) {
          if (response.data.response) {
            if (response.data.response.statusCode == 404) {
              $scope.state.error = response.data.response.body.error;
              toastr.error(response.data.response.body.error.message);
              $scope.leaderboard = [];
            }
          }
          else {
            $scope.leaderboard = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    $scope.selectNewMoon = function() {
      if ($scope.selectedNewMoon) {
        getLeaderboardMoons($scope.selectedNewMoon.iso8601);
      }
    }

    // $scope.changeView = function(view) {
    //   $scope.state.view = view;
    //   init();
    // };

  }]);
