describe('HomeController', function() {

  beforeEach(angular.mock.module('towersApp'));

  var $httpBackend;
  var TowerFactory, $timeout, $q, scope, controller;

  beforeEach(inject(function($rootScope, $controller, $timeout, $q, _$httpBackend_, _TowerFactory_) {
    $httpBackend = _$httpBackend_;
    TowerFactory = _TowerFactory_;
    $q = $q;
    $timeout = $timeout;

    scope = $rootScope.$new();
    controller = $controller('HomeController', {
      $scope: scope,
      TowerFactory: TowerFactory
    });

    $httpBackend.whenGET('/api/tower/all').respond([]);
    $httpBackend.expectGET('/api/tower/all');
    $httpBackend.flush();

    scope.$apply();
  }));

  it('initializes with proper $scope', function() {
    expect(scope.towers).toEqual([]);
    expect(scope.totalItems).toEqual(0);
    expect(scope.currentPage).toEqual(1);
  });

});
