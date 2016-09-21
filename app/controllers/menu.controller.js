angular.module('towersApp')
  .controller('MenuController', ['$scope', '$cookies', '$state', 'AuthService', function($scope, $cookies, $state, AuthService) {

    $scope.authed = AuthService.getAuthed();

    if ($cookies.get('userApiKey'))
      $scope.authed = true;

    // Watch for changes in auth service to update scope
    $scope.$watch(function() {
      return AuthService.getAuthed();
    }, function() {
      $scope.authed = AuthService.getAuthed();
    })

    $scope.logout = function() {
      $scope.authed = false;

      AuthService.setAuthed(false);

      $state.go('login');
    }

  }]);
