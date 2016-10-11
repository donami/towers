export default function authCheck($cookies, $state, $rootScope) {
  'ngInject';

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
}
