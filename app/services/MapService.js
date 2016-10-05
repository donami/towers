angular.module('towersApp')
  .service('MapService', ['$http', '$q', function($http, $q) {

    // Get link to image of map based on formatted address
    this.getMap = function(address) {
      address = encodeURIComponent(address);

      var deferred = $q.defer();

      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'A&key=AIzaSyAVDQ0TEStpgqBt6jRpnSJYQvg3mxWDcag')
        .then(function(response) {
          var lat = response.data.results[0].geometry.location.lat;
          var lng = response.data.results[0].geometry.location.lng;

          var map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + address + '&zoom=13&size=600x300&maptype=roadmap&markers=color:green%7C' + lat + ',' + lng + '&key=AIzaSyAsv5cUVztNbGdJbtK1mgE1ag7YQtq3lCY';
          deferred.resolve({ map: map });
        })
        .catch(function(error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

  }]);
