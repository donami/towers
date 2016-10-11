export default function redirectTo($rootScope, $state) {
  'ngInject';

  // If parent state has redirectTo property, use it to change state
  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault();
      $state.go(to.redirectTo, params);
    }
  });
}
