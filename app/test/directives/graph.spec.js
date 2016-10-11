describe('Graph directive', function() {
  beforeEach(angular.mock.module('towersApp'));
  beforeEach(window.angular.mock.module("my.templates"))

  let element, scope;


  // beforeEach(inject(function(_$rootScope_,_$compile_) {
  //     let $rootScope = _$rootScope_,
  //         $compile = _$compile_;
  //
  //     scope = $rootScope.$new();
  //
  //     element = angular.element('<graph graph-title="title" data="data" labels="labels" series="series"></graph>');
  //
  //     $compile(element)(scope);
  //
  // }));


  // beforeEach(inject(function($rootScope, $compile) {
  //   scope = $rootScope;
  //   scope.title = 'A title';
  //   scope.data = ['Data 1', 'Data 2'];
  //   scope.labels = ['Label 1', 'Label 2'];
  //   scope.series = ['Series 1'];
  //
  //   element = '<graph graph-title="title" data="data" labels="labels" series="series"></graph>';
  //
  //   element = $compile(element)(scope);
  //
  //   scope.$digest();
  // }));
  //
  // it('should have a h1 element that equals the scopes title', function() {
  //   var headingElement = element.find('h1');
  //   expect(headingElement.text()).toEqual(scope.title);
  // });

  // it('should have a canvas element', function() {
  //   expect(element.html()).toContain('canvas');
  // });
  //
  // it('canvas should have required attributes', function() {
  //   var canvasElement = element.find('canvas');
  //
  //   expect(canvasElement.attr('chart-data')).toBeDefined();
  //   expect(canvasElement.attr('chart-labels')).toBeDefined();
  //   expect(canvasElement.attr('chart-series')).toBeDefined();
  // });
  //
  // it('should have data values', function() {
  //   expect(element.isolateScope().data).toEqual(jasmine.any(Array));
  // });
  //
  // it('should have labels', function() {
  //   expect(element.isolateScope().labels).toEqual(jasmine.any(Array));
  // });
  //
  // it('should have series', function() {
  //   expect(element.isolateScope().series).toEqual(jasmine.any(Array));
  // });
  //
  // it('should not display canvas if there is no data', function() {
  //   scope.data = [];
  //   scope.$digest();
  //
  //   var canvas = element.find('canvas');
  //
  //   expect(canvas.hasClass('ng-hide')).toBe(true);
  // });
});
