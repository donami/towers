angular.module('towersApp')
  .controller('PersonalController', ['$scope', '$cookies', function($scope, $cookies) {

    $scope.userApiKey = $cookies.get('userApiKey');

  }]);
