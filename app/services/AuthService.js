'use strict';

const API_PERSONAL = '/api/verify-key/';

angular.module('towersApp')
  .service('AuthService', ['$cookies', '$http', function($cookies, $http) {

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

  }]);
