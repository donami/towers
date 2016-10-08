(function() {
  'use strict';

  angular
    .module('towersApp')
    .filter('dateToISO', dateToIso);

  function dateToIso() {
    return function(input) {
      input = new Date(input).toISOString();
      return input;
    };
  }

})();
