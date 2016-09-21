angular.module('towersApp')
  .controller('HallOfFameController', ['$scope', 'TowerFactory', function($scope, TowerFactory) {

    $scope.countries = [];

    getFirstInCountry();

    function getFirstInCountry() {
      TowerFactory.getFirstInCountry()
        .then(function(response) {
          $scope.countries = response.data;
        }, function(err) {
          console.log(err);
        });
    }



  }]);
