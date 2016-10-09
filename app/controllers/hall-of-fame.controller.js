(function() {
  'use strict';

  angular
    .module('towersApp')
    .controller('HallOfFameController', HallOfFameController);

  HallOfFameController.$inject = ['_countries'];
  function HallOfFameController(_countries) {
    var vm = this;
    vm.countries = [];
    vm.countries = _countries.data;
  }

})();
