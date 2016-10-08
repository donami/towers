angular.module('towersApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      url: '',
      templateUrl: 'views/layout.html'
    })
    .state('app.about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutController'
    })
    .state('app.me', {
      url: '/',
      templateUrl: 'views/me.html',
      controller: 'MeController',
      redirectTo: 'app.me.main',
    })
    .state('app.me.main', {
      url: '',
      templateUrl: 'views/partials/me.main.html',
    })
    .state('app.me.calendar', {
      url: 'me/calendar',
      templateUrl: 'views/partials/me.calendar.html',
    })
    .state('app.me.graphs', {
      url: 'me/graphs',
      templateUrl: 'views/partials/me.graphs.html',
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
      redirectTo: 'app.towerSingle.main',
    })
    .state('app.towerSingle.main', {
      url: '/',
      templateUrl: 'views/partials/tower-single.main.html',
    })
    .state('app.towerSingle.log', {
      url: '/log',
      templateUrl: 'views/partials/tower-single.log.html',
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
