angular.module('towersApp')
  .controller('AchievementController', ['AchievementFactory', 'toastr', function(AchievementFactory, toastr) {
    var vm = this;
    vm.achievements = [];
    vm.state = {
      loading: false
    };
    vm.refresh = refresh;

    init();

    function init() {
      AchievementFactory.getAchievements()
        .then(function(response) {
          vm.achievements = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function refresh() {
      vm.state.loading = true;

      AchievementFactory.refresh()
        .then(function(response) {
          vm.state.loading = false;

          if (response.data.length > vm.achievements.length) {
            toastr.success('You have earned new achievements', 'Congratulations!');
          }

          init();
        })
        .catch(function(error) {
          console.log(error);
        })
    }

  }]);
