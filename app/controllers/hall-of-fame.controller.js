angular.module('towersApp')
  .controller('HallOfFameController', ['$scope', 'TowerFactory', function($scope, TowerFactory) {
    var vm = this;
    vm.countries = [];

    getFirstInCountry();

    function getFirstInCountry() {
      TowerFactory.getFirstInCountry()
        .then(function(response) {
          vm.countries = response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }

  }]);
