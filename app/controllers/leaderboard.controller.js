angular.module('towersApp')
  .controller('LeaderboardController', ['$scope', 'TowerFactory', 'MoonFactory', 'toastr', function($scope, TowerFactory, MoonFactory, toastr) {

    $scope.state = {
      view: 'overall',
    };

    $scope.leaderboard = [];
    $scope.selectedNewMoon = {};

    $scope.orderBy = 'claim_count';
    $scope.reverseOrder = false;

    init();

    function init() {
      switch ($scope.state.view) {

        case 'geldByNewMoon':
          loadNewMoons();
          getLeaderboardMoons();
          break;

        case 'overall':
        default:
          getLeaderboard();

      }
    }

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
          var newMoons = response.data.filter(function(obj) {
            return today > new Date(obj.iso8601);
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
      getLeaderboardMoons($scope.selectedNewMoon.iso8601);
    }

    $scope.changeView = function(view) {
      $scope.state.view = view;
      init();
    };

  }]);
