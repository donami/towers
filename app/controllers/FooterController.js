(function() {
  'use strict';

  angular
    .module('towersApp')
    .controller('FooterController', FooterController);

  FooterController.$inject = ['LanguageService'];
  function FooterController(LanguageService) {
    var vm = this;
    vm.changeLanguage = changeLanguage;

    function changeLanguage(language) {
      LanguageService.setLanguage(language);
    }

  }

})();
