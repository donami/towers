export default class MenuController {
  constructor($scope, $cookies, $state, AuthService, toastr) {
    'ngInject';

    this.AuthService = AuthService;
    this.toastr = toastr;
    this.$state = $state;
    this.scope = $scope;

    this.authed = AuthService.getAuthed();

    // If cookie exists, set user is authed
    if ($cookies.get('userApiKey')) {
      this.authed = true;
    }

    // Watch for changes in auth service to update scope
    this.scope
        .$watch(
            () => AuthService.getAuthed(),
            () => this.authed = AuthService.getAuthed()
        );
  }

  logout() {
    this.authed = false;

    this.AuthService.setAuthed(false);

    this.toastr.success('You are now signed out', 'Signed out');
    this.$state.go('login');
  }
}
