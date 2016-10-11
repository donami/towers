const API_PERSONAL = '/api/verify-key/';

export default class AuthService {

  constructor($cookies, $http) {
    'ngInject';

    this.$cookies = $cookies;
    this.$http = $http;

    this.authed = false;

    if ($cookies.get('userApiKey'))
      this.authed = true;
  }

  setAuthed(authed) {
    if (authed === false)
      this.$cookies.remove('userApiKey');

    this.authed = authed;
  }

  getAuthed() {
    return this.authed;
  }

  auth(apiKey) {
    return this.$http.get(API_PERSONAL + apiKey);
  }
}
