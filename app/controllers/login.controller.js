// LoginController.$inject = ['$cookies', '$state', 'AuthService', 'toastr'];
export default class LoginController {
  constructor($cookies, $state, AuthService, toastr) {
    'ngInject';

    this.$cookies = $cookies;
    this.$state = $state;
    this.AuthService = AuthService;
    this.toastr = toastr;
  }

  submitApiKey() {
    let userApiKey = this.userApiKey;

    this.AuthService.auth(userApiKey)
      .then((response) => {
        this.toastr.clear();
        this.$cookies.put('userApiKey', userApiKey);
        this.$cookies.put('userPlayerId', 'tN5p7SSvzb30fIRtA6tp2aQn0Y9YTOZQ4k3MFjw3t/I='); // TODO: should not be hardcoded
        this.AuthService.setAuthed(true);

        this.toastr.success('You are now logged in', 'Success');
        this.$state.go('app.me');
      })
      .catch(error => {
        this.toastr.clear();
        this.toastr.error('The API key was not correct', 'Invalid API key');
      });
  }

}
