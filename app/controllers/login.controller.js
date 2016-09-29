angular.module('towersApp')
  .controller('LoginController', ['$scope', '$cookies', '$state', 'AuthService', 'toastr', function($scope, $cookies, $state, AuthService, toastr) {

    $scope.submitApiKey = function() {
      var userApiKey = $scope.userApiKey;


      AuthService.auth(userApiKey)
        .then(function(response) {
          toastr.clear();
          $cookies.put('userApiKey', userApiKey);
          $cookies.put('userPlayerId', 'tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I='); // TODO: should not be hardcoded
          AuthService.setAuthed(true);

          toastr.success('You are now logged in', 'Success');
          $state.go('app.home');
        }, function(error) {
          toastr.clear();
          toastr.error('The API key was not correct', 'Invalid API key');
        });
    };

  }]);
