describe('MapService', () => {

  let MapService;
  let httpBackend;

  beforeEach(angular.mock.module('towersApp'));

  beforeEach(inject(function(_MapService_, _$httpBackend_, _$cookies_) {
    MapService = _MapService_;
    httpBackend = _$httpBackend_;

    httpBackend.whenGET('views/login.html').respond([]);
    httpBackend.expectGET('views/login.html');
    httpBackend.flush();
  }));

  it('should have a function called getMap', () => {
    expect(MapService.getMap).toBeDefined();
  });

  it('should make a get request', () => {
    MapService.getMap('Kronobergsgatan 46, 371 41 Karlskrona, Sweden');
    var address = encodeURIComponent('Kronobergsgatan 46, 371 41 Karlskrona, Sweden');

    httpBackend.whenGET('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'A&key=AIzaSyAVDQ0TEStpgqBt6jRpnSJYQvg3mxWDcag').respond({
      results: [{
        geometry: {
          location: {
            lat: 56.18795489999999,
            lng: 15.5952771
          }
        }
      }]
    });
    httpBackend.expectGET('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 'A&key=AIzaSyAVDQ0TEStpgqBt6jRpnSJYQvg3mxWDcag');
    httpBackend.flush();
  });
});
