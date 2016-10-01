/* global langSwedish, langEnglish */
'use strict';

var app = angular.module('towersApp', ['ui.router', 'ui.bootstrap', 'ngCookies', 'chart.js', 'toastr', 'pascalprecht.translate', 'angular-cache']);

app.config(['CacheFactoryProvider', function (CacheFactoryProvider) {
  angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
}]);

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
