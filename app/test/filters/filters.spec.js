describe('filter', function() {
  beforeEach(angular.mock.module('towersApp'));

  var $filter;

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  describe('validDate', function() {
    it('should display a formatted date if the date is valid', function() {
      expect( $filter('validDate')('2016-01-01T01:01:01Z') ).toEqual('Jan 1, 2016');
    });

    it('should display a dash if incorrect formatted', function() {
      expect( $filter('validDate')('0000-00-00T00:00:00Z') ).toEqual('-');
    });
  });

})
