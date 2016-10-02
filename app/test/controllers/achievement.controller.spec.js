describe('Achievement controller', function() {
  beforeEach(angular.mock.module('towersApp'));

  var scope, controller, httpBackend, AchievementFactory;

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _AchievementFactory_) {
    httpBackend = _$httpBackend_;
    AchievementFactory = _AchievementFactory_;

    scope = $rootScope.$new();
    $controller = $controller('AchievementController', {
      $scope: scope,
    });

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
    expect(scope.achievements).toEqual([]);
  })

  it('has a state', function() {
    expect(scope.state.loading).toBe(false);
  })

  it('should have a refresh function', function() {
    expect(scope.refresh).toBeDefined();
  })

  it('loading to be false after refreshing is done', function() {
    scope.refresh();
    httpBackend.whenGET('/api/achievement/refresh').respond([]);
    httpBackend.expectGET('/api/achievement/refresh');
    httpBackend.flush();

    expect(scope.state.loading).toBe(false);
  })

})
