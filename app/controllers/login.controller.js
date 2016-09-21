angular.module('towersApp')
  .controller('LoginController', ['$scope', '$cookies', '$state', 'AuthService', function($scope, $cookies, $state, AuthService) {

    $scope.submitApiKey = function() {
      var userApiKey = $scope.userApiKey;
      if (AuthService.auth(userApiKey)) {
        console.log('Auth successful');
        $state.go('home');
      }
    }

  }]);
