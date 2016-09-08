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
    });

}]);

app.controller('HomeController', ['$scope', function($scope) {

  // Code

}]);

app.controller('AboutController', ['$scope', function($scope) {

  // Code

}]);

app.controller('LoginController', ['$scope', function($scope) {

  // Code

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
