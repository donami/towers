describe('Achievement controller', function() {
  beforeEach(angular.mock.module('towersApp'));

  var scope, controller, httpBackend, AchievementFactory;

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _AchievementFactory_) {
    httpBackend = _$httpBackend_;
    AchievementFactory = _AchievementFactory_;

    scope = $rootScope.$new();
    controller = $controller('AchievementController');

    localStorage.clear();

    httpBackend.whenGET('/api/achievement').respond([]);
    httpBackend.expectGET('/api/achievement');
    httpBackend.flush();

    scope.$apply();
  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

  it('initializes with a proper scope', function() {
    expect(controller.achievements).toEqual([]);
  });

  it('has a state', function() {
    expect(controller.state.loading).toBe(false);
  });

  it('should have a refresh function', function() {
    expect(controller.refresh).toBeDefined();
  });

  it('loading to be false after refreshing is done', function() {
    controller.refresh();
    httpBackend.whenGET('/api/achievement/refresh').respond([]);
    httpBackend.expectGET('/api/achievement/refresh');
    httpBackend.flush();

    expect(controller.state.loading).toBe(false);
  });

});
