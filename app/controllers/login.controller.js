angular.module('towersApp')
  .controller('LoginController', ['$scope', '$cookies', function($scope, $cookies) {

    $scope.submitApiKey = function() {
      var userApiKey = $scope.userApiKey;
      $cookies.put('userApiKey', userApiKey);
    }

  }]);
