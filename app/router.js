angular.module('towersApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

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
    .state('app.achievements', {
      url: '/achievements',
      templateUrl: 'views/achievements.html',
      controller: 'AchievementController'
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