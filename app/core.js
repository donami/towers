'use strict';

var app = angular.module('towersApp', ['ui.router'])

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
    });

}]);

app.controller('HomeController', ['$scope', function($scope) {
  console.log('Welcome');
}])

app.controller('AboutController', ['$scope', function($scope) {
  console.log('About');
}]);
