'use strict';

var app = angular.module('towersApp', ['ui.router', 'ngCookies', 'chart.js'])

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
    })
    .state('leaderboard', {
      url: '/leaderboard',
      templateUrl: 'views/leaderboard.html',
      controller: 'LeaderboardController',
    })
    .state('hallOfFame', {
      url: '/hall-of-fame',
      templateUrl: 'views/hall-of-fame.html',
      controller: 'HallOfFameController',
    });

}]);
