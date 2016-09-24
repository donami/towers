angular.module('towersApp')
  .controller('LoginController', ['$scope', '$cookies', '$state', 'AuthService', 'toastr', function($scope, $cookies, $state, AuthService, toastr) {

    $scope.submitApiKey = function() {
      var userApiKey = $scope.userApiKey;
      if (AuthService.auth(userApiKey)) {
        toastr.success('You are now logged in', 'Success');
        $state.go('app.home');
      }
    }

  }]);
