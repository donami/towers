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

  describe('filterMoons', function() {
    it('should filter out options from secondSelect that is after the firstSelect', function() {
      var firstSelect = {
        iso8601: '2016-01-01'
      };

      var secondSelect = [
        { iso8601: '2015-01-01' },
        { iso8601: '2016-01-01' },
        { iso8601: '2017-01-01' },
        { iso8601: '2018-01-01' },
      ];

      var filtered = $filter('filterMoons')(secondSelect, firstSelect);
      expect(filtered.length).toBe(3);
    });

    it('should return secondSelect if firstSelect is not defined', function() {
      var secondSelect = [
        { iso8601: '2015-01-01' },
        { iso8601: '2016-01-01' },
        { iso8601: '2017-01-01' },
        { iso8601: '2018-01-01' },
      ];

      var filtered = $filter('filterMoons')(secondSelect);

      expect(filtered).toEqual(secondSelect);
    });
  })

})
