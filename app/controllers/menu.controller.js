angular.module('towersApp')
  .controller('MenuController', ['$scope', '$cookies', '$state', 'AuthService', 'toastr', function($scope, $cookies, $state, AuthService, toastr) {
    var vm = this;

    vm.authed = AuthService.getAuthed();
    vm.logout = logout;
    
    // If cookie exists, set user is authed
    if ($cookies.get('userApiKey')) {
      vm.authed = true;
    }

    // Watch for changes in auth service to update scope
    $scope.$watch(function() {
      return AuthService.getAuthed();
    }, function() {
      vm.authed = AuthService.getAuthed();
    });

    function logout() {
      vm.authed = false;

      AuthService.setAuthed(false);

      toastr.success('You are now signed out', 'Signed out');
      $state.go('login');
    };

  }]);
