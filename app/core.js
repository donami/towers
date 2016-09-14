'use strict';

var app = angular.module('towersApp', ['ui.router', 'chart.js'])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutController'
    })
    .state('test', {
      url: '/test',
      templateUrl: 'views/test.html',
      controller: 'testCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .state('towerSingle', {
      url: '/tower/:id',
      templateUrl: 'views/tower-single.html',
      controller: 'TowerController',
    });

}]);

app.controller('HomeController', ['$scope', 'GraphFactory', function($scope, GraphFactory) {

  $scope.towers = [];

  initTowers();

  function initTowers() {
    GraphFactory.getTowers()
      .then(function(response) {
        var data = response.data.slice(1,10);              // TODO: should not be sliced, obviously. Find a way to display towers. All towers in a list may be too much.

        $scope.towers = data;
      }, function(error) {
        $scope.status = 'Unable to load towers: ' + error.message;
      });
  }

}]);

app.controller('AboutController', ['$scope', function($scope) {

  // Code

}]);

app.controller('LoginController', ['$scope', function($scope) {

  // Code

}]);

app.controller('TowerController', ['$scope', 'GraphFactory', '$stateParams', function($scope, GraphFactory, $stateParams) {

  $scope.tower = {};

  findTowerById($stateParams.id);

  function findTowerById(id) {
    GraphFactory.findById(id)
      .then(function(response) {
        $scope.tower = response.data;
      }, function(error) {
        $scope.status = 'Unable to load tower: ' + error.message;
      });
  }

}]);




app.controller('testCtrl', ['$scope', function ($scope) {
  $scope.labels = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
  ];
  $scope.series = ['Takeovers'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 65, 59, 80, 81, 56, 55, 40, 12, 19, 20, 8]
  ];
}]);
