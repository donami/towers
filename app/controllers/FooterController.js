angular.module('towersApp')
  .controller('FooterController', ['LanguageService', function(LanguageService) {
    var vm = this;
    vm.changeLanguage = changeLanguage;

    function changeLanguage(language) {
      LanguageService.setLanguage(language);
    };

  }]);
