angular.module('towersApp')
  .controller('LoginController', ['$scope', '$cookies', '$state', 'AuthService', 'toastr', function($scope, $cookies, $state, AuthService, toastr) {

    $scope.submitApiKey = function() {
      var userApiKey = $scope.userApiKey;


      AuthService.auth(userApiKey)
        .then(function(response) {
          toastr.clear();
          $cookies.put('userApiKey', userApiKey);
          AuthService.setAuthed(true);

          toastr.success('You are now logged in', 'Success');
          $state.go('app.home');
        }, function(error) {
          toastr.clear();
          toastr.error('The API key was not correct', 'Invalid API key');
        });
    }

  }]);
