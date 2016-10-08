(function() {
  'use strict';

  angular
    .module('towersApp')
    .service('LanguageService', LanguageService);

  LanguageService.$inject = ['$cookies', '$translate'];
  function LanguageService($cookies, $translate) {
    this.setLanguage = function(language) {
      $translate.use(language);
      $cookies.put('language', language);
    };
  }

})();
