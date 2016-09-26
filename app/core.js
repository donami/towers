/* global langSwedish, langEnglish */
'use strict';

var app = angular.module('towersApp', ['ui.router', 'ui.bootstrap', 'ngCookies', 'chart.js', 'toastr', 'pascalprecht.translate']);

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

  });

}]);

app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', langEnglish);

  $translateProvider.translations('se', langSwedish);

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');
}]);

app.run(['$cookies', '$translate', function($cookies, $translate) {
  if ($cookies.get('language')) {
    $translate.use($cookies.get('language'));
  }
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      templateUrl: 'views/layout.html'
    })
    .state('app.home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .state('app.about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutController'
    })
    .state('app.me', {
      url: '/me',
      templateUrl: 'views/me.html',
      controller: 'MeController'
    })
    .state('app.graph', {
      url: '/stats',
      templateUrl: 'views/graph.html',
      controller: 'GraphController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .state('app.towerSingle', {
      url: '/tower/:id',
      templateUrl: 'views/tower-single.html',
      controller: 'TowerController',
    })
    .state('app.leaderboard', {
      url: '/leaderboard',
      templateUrl: 'views/leaderboard.html',
      controller: 'LeaderboardController',
    })
    .state('app.hallOfFame', {
      url: '/hall-of-fame',
      templateUrl: 'views/hall-of-fame.html',
      controller: 'HallOfFameController',
    });

}]);
