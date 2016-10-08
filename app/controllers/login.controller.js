(function() {
  'use strict';

  angular
    .module('towersApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$cookies', '$state', 'AuthService', 'toastr'];
  function LoginController($scope, $cookies, $state, AuthService, toastr) {
    var vm = this;
    vm.submitApiKey = submitApiKey;

    function submitApiKey() {
      var userApiKey = $scope.userApiKey;

      AuthService.auth(userApiKey)
        .then(function(response) {
          toastr.clear();
          $cookies.put('userApiKey', userApiKey);
          $cookies.put('userPlayerId', 'tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I='); // TODO: should not be hardcoded
          AuthService.setAuthed(true);

          toastr.success('You are now logged in', 'Success');
          $state.go('app.me');
        }, function(error) {
          toastr.clear();
          toastr.error('The API key was not correct', 'Invalid API key');
        });
    }

  }
})();
