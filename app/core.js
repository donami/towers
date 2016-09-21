'use strict';

var app = angular.module('towersApp', ['ui.router', 'ngCookies', 'chart.js'])

app.run(['$cookies', '$state', '$rootScope', function($cookies, $state, $rootScope) {

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

    // Don't redirect if user is trying to access login page
    if (toState.name === 'login')
      return;

    // Check if user has provided api key in cookie
    if (!$cookies.get('userApiKey')) {
      console.log('User has not provided API key');

      // Prevent default state
      e.preventDefault();
      // Set state to login
      $state.go('login');
    }

  })


}]);

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
    .state('personal', {
      url: '/personal',
      templateUrl: 'views/personal.html',
      controller: 'PersonalController'
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
