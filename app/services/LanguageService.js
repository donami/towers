angular.module('towersApp')
  .service('LanguageService', ['$cookies', '$translate', function($cookies, $translate) {
    this.setLanguage = function(language) {
      $translate.use(language);
      $cookies.put('language', language);
    }
  }]);
