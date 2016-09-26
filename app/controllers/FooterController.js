angular.module('towersApp')
  .controller('FooterController', ['$scope', 'LanguageService', function($scope, LanguageService) {
    $scope.changeLanguage = function(language) {
      LanguageService.setLanguage(language);
    }
  }]);
