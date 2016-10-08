(function() {
  'use strict';

  angular
    .module('towersApp')
    .controller('HallOfFameController', HallOfFameController);

  HallOfFameController.$inject = ['$scope', 'TowerFactory'];
  function HallOfFameController($scope, TowerFactory) {
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

  }

})();
