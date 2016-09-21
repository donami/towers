angular.module('towersApp')
  .controller('MeController', ['$scope', '$cookies', 'MeFactory', 'TowerFactory',
  function($scope, $cookies, MeFactory, TowerFactory) {

    $scope.userApiKey = $cookies.get('userApiKey');

    $scope.claimedTowers = [];

    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    MeFactory.getClaims()
      .then(function(response) {
        $scope.claimedTowers = response.data;
        $scope.totalItems = response.data.length;

      }, function(error) {
        console.log(error);
      });

    // Filter for paginating the results
    $scope.paginate = function(value) {
      var begin, end, index;
      begin = ($scope.currentPage - 1) * $scope.numPerPage;
      end = begin + $scope.numPerPage;
      index = $scope.claimedTowers.indexOf(value);
      return (begin <= index && index < end);
    };

  }]);
