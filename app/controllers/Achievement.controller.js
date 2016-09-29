angular.module('towersApp')
  .controller('AchievementController', ['$scope', 'AchievementFactory', 'toastr', function($scope, AchievementFactory, toastr) {

    $scope.achievements = [];

    $scope.state = {
      loading: false
    };

    init();

    function init() {
      AchievementFactory.getAchievements()
        .then(function(response) {
          $scope.achievements = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    $scope.refresh = function() {
      $scope.state.loading = true;

      AchievementFactory.refresh()
        .then(function(response) {
          $scope.state.loading = false;

          if (response.data.length > $scope.achievements.length) {
            toastr.success('You have earned new achievements', 'Congratulations!');
          }

          init();
        })
        .catch(function(error) {
          console.log(error);
        })
    }

  }]);
