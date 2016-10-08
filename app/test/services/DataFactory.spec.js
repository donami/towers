describe('DataFactory', function() {
  beforeEach(angular.mock.module('towersApp'));

  var DataFactory;

  beforeEach(inject(function(_DataFactory_) {
    DataFactory = _DataFactory_;
  }));

  describe('handleCitiesWithMostTowers', function() {

    var input;

    beforeEach(function() {
      input = [
        { city: null, },
        { city: 'Stockholm', },
        { city: 'Stockholm', },
        { city: 'New York', },
        { city: 'New York', },
        { city: 'New York', },
        { city: 'Madrid', },
      ];
    });

    it('should have a property named amount', function() {

      var data = DataFactory.handleCitiesWithMostTowers(input);
      expect(data[0].amount).toBeDefined();

    });

    it('should not have any cities that are set to null', function() {

      var data = DataFactory.handleCitiesWithMostTowers(input);
      data.forEach(function(obj) {
        expect(obj).not.toEqual(jasmine.objectContaining({
          city: null
        }));
      });

    });

    it('should be sorted', function() {

      var data = DataFactory.handleCitiesWithMostTowers(input);

      expect(data[0].amount).not.toBeLessThan(data[1].amount);

    });

    it('should not return more than 10 items', function() {
      input = input.concat([
        { city: 'City 1' },
        { city: 'City 2' },
        { city: 'City 3' },
        { city: 'City 4' },
        { city: 'City 5' },
        { city: 'City 6' },
        { city: 'City 7' },
        { city: 'City 8' },
      ]);

      var data = DataFactory.handleCitiesWithMostTowers(input);

      expect(data.length).toBe(10);
    });

  });

  describe('handleMostGeldBonus', function() {

    var input;

    beforeEach(function() {
      input = [
        { geld_bonus: "6088.752099" },
        { geld_bonus: "7000.9" },
        { geld_bonus: "1.921321" },
        { geld_bonus: "12.1" },
      ];
    });

    it('should be sorted', function() {
      var data = DataFactory.handleMostGeldBonus(input);

      expect(data[0].geld_bonus).not.toBeLessThan(data[1].geld_bonus);
    });

  });

  describe('handleMostTowersBuilt', function() {

    var input;

    beforeEach(function() {
      input = [
        { count: "48" },
        { count: "999" },
        { count: "1" },
        { count: null },
      ];
    });

    it('should be sorted', function() {
      var data = DataFactory.handleMostTowersBuilt(input);

      expect(data[0].tower_count).not.toBeLessThan(data[1].tower_count);
    });

  });

  describe('handleMostGeldCollected', function() {

    var input;

    beforeEach(function() {
      input = [
        { geld_collected: 47443.647742 },
        { geld_collected: 2 },
        { geld_collected: 5000.9 },
        { geld_collected: null },
      ];
    });

    it('should be sorted', function() {
      var data = DataFactory.handleMostGeldCollected(input);

      expect(data[0].geld_collected).not.toBeLessThan(data[1].geld_collected);
    });

  });

  describe('handleTopClaims', function() {

    var input;

    beforeEach(function() {
      input = [
        { claim_count: 5 },
        { claim_count: 0 },
        { claim_count: 999 },
        { claim_count: null },
      ];
    });

    it('should be sorted', function() {
      var data = DataFactory.handleTopClaims(input);

      expect(data[0].claim_count).not.toBeLessThan(data[1].claim_count);
    });

  });

});
