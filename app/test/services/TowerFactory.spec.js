describe('TowerFactory', function() {

  var TowerFactory;

  beforeEach(angular.mock.module('towersApp'));
  beforeEach(inject(function(_TowerFactory_) {
    TowerFactory = _TowerFactory_;
  }));

  describe('getLeaderboardMoons', function() {
    it('should return false if no date provided', function() {
      expect(TowerFactory.getLeaderboardMoons()).toBeFalsy();
    });
  });

});
