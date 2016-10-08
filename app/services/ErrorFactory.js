(function() {
  'use strict';

  angular
    .module('towersApp')
    .service('ErrorFactory', ErrorFactory);

  function ErrorFactory() {

    this.errors = {
      // NoMapFound: {
      //   type: 'toast',
      // }
    }

    this.handleError = function(error) {
      if (this.errors[error.exception]) {
        return this.errors[error.exception].type;
      }
      return null;
    }
  }

})();
