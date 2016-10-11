export default class MapService {
  constructor($http, $q) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
  }

  // Get link to image of map based on formatted address
  getMap(address) {
    address = encodeURIComponent(address);

    let deferred = this.$q.defer();

    this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'A&key=AIzaSyAVDQ0TEStpgqBt6jRpnSJYQvg3mxWDcag')
      .then((response) => {
        if (response.data.results.length) {
          let lat = response.data.results[0].geometry.location.lat;
          let lng = response.data.results[0].geometry.location.lng;

          let map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + address + '&zoom=13&size=600x300&maptype=roadmap&markers=color:green%7C' + lat + ',' + lng + '&key=AIzaSyAsv5cUVztNbGdJbtK1mgE1ag7YQtq3lCY';
          deferred.resolve({ map: map });
        }
        deferred.reject({data: { message: 'No map found' }, id: 'no_map_found' });
      })
      .catch(error => deferred.reject(error));

    return deferred.promise;
  }

}
