'use strict';

angular.module('towersApp')
  .service('AuthService', ['$cookies', function($cookies) {

    if ($cookies.get('userApiKey'))
      this.authed = true;
    else
      this.authed = false;

    this.setAuthed = function(authed) {
      if (authed === false)
        $cookies.remove('userApiKey');

      this.authed = authed;
    }

    this.getAuthed = function() {
      return this.authed;
    }

    this.auth = function(apiKey) {
      this.authed = true;
      $cookies.put('userApiKey', apiKey);
      return true;
    }

  }]);
