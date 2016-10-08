(function() {
  'use strict';

  angular
    .module('towersApp')
    .service('AuthService', AuthService);

  AuthService.$inject = ['$cookies', '$http'];
  function AuthService($cookies, $http) {

    var API_PERSONAL = '/api/verify-key/';

    if ($cookies.get('userApiKey'))
      this.authed = true;
    else
      this.authed = false;

    this.setAuthed = function(authed) {
      if (authed === false)
        $cookies.remove('userApiKey');

      this.authed = authed;
    };

    this.getAuthed = function() {
      return this.authed;
    };

    this.auth = function(apiKey) {
      return $http.get(API_PERSONAL + apiKey);
    };

  }

})();
