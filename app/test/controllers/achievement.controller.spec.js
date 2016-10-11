import AchievementController from './../../controllers'

describe('AchievementController', () => {
  let $rootScope, $state, $location, $controller, $compile, $httpBackend;

  beforeEach(window.module('towersApp'));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend')
  }));

  describe('Controller', () => {

    let controller, httpBackend;

    beforeEach(() => {
      httpBackend = $httpBackend;
      controller = $controller('AchievementController', {
        $scope: $rootScope.$new()
      });
    });

    it('initializes with a proper scope', () => {
      expect(controller.achievements).toEqual([]);
    });

    it('has a state', function() {
      expect(controller.state.loading).toBe(false);
    });

    it('should have a refresh function', function() {
      expect(controller.refresh).toBeDefined();
    });

    // it('loading to be false after refreshing is done', function() {
    //   controller.refresh();
    //   httpBackend.whenGET('/api/achievement/refresh').respond([]);
    //   httpBackend.expectGET('/api/achievement/refresh');
    //   httpBackend.flush();
    //
    //   expect(controller.state.loading).toBe(false);
    // });
    // 
  });
});


// import TowerController from './../../controllers'
//
// describe('TowerController', () => {
//   let $rootScope, $state, $location, $controller, $compile;
//
//   beforeEach(window.module('towersApp'));
//
//   beforeEach(inject(($injector) => {
//     $rootScope = $injector.get('$rootScope');
//     $controller = $injector.get('$controller');
//     // $componentController = $injector.get('$componentController');
//     $state = $injector.get('$state');
//     $location = $injector.get('$location');
//     $compile = $injector.get('$compile');
//   }));
//
//   describe('Controller', () => {
//
//     let controller;
//     beforeEach(() => {
//       controller = $controller('TowerController', {
//         $scope: $rootScope.$new()
//       });
//     });
//
//     it('initialize with a loading state', () => { // erase if removing this.name from the controller
//       expect(controller.state.loading).toBe(true);
//       // expect(controller).to.have.property('name');
//     });
//
//     it('initializes with a proper scope', () => {
//       expect(controller.achievements).toEqual([]);
//     });
//     // top-level specs: i.e., routes, injection, naming
//     // it('About component should be visible when navigates to /about', () => {
//     //   $location.url('/about');
//     //   $rootScope.$digest();
//     //   expect($state.current.component).to.eq('about');
//     // });
//   });
// });

// import { assert } from 'chai';
//
// import { TowerController } from './../../controllers/';
//
// let controller, ctrl, scope;
//
// describe('TowerController', () => {
//
//     beforeEach(function($controller, _TowerController_, $state, $injector) {
//       // controller = new TowerController();
//       // console.log(TowerController);
//       // controller = $controller;
//       scope = $injector.get('$rootScope').$new();
//       ctrl = controller(_TowerController_, {
//         $scope: scope,
//         $state: $state
//       });
//       // console.log(ctrl);
//
//       // ctrl = 'hej';
//       scope.$digest();
//
//     });
//     //
//     it('should intitialize with loading state', () => {
//       console.log(ctrl);
//       expect(ctrl).toBe('hej');
//         // assert.equal(controller.state.loading, true);
//         // console.log(controller);
//     });
//     //
//     // it('should accept initial counter value as dependency', function () {
//     //     component = new SomeComponent(30);
//     //     assert.equal(component.counter, 30);
//     // });
//     //
//     // it('should increment counter value after increment is called', function () {
//     //     assert.equal(component.counter, 20);
//     //     component.increment();
//     //     assert.equal(component.counter, 21);
//     // });
//
// });

// describe('Achievement controller', function() {
//   beforeEach(angular.mock.module('towersApp'));
//   beforeEach(window.angular.mock.module("my.templates"))
//
//   let scope, controller, httpBackend, AchievementFactory;
//
//   beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _AchievementFactory_) {
//     httpBackend = _$httpBackend_;
//     AchievementFactory = _AchievementFactory_;
//
//     scope = $rootScope.$new();
//     // controller = $controller('AchievementController');
//     controller = new AchievementController();
//
//     localStorage.clear();
//
//     httpBackend.whenGET('/api/achievement').respond([]);
//     httpBackend.expectGET('/api/achievement');
//     httpBackend.flush();
//
//     scope.$apply();
//   }));
//
//   // afterEach(function() {
//   //   httpBackend.verifyNoOutstandingExpectation();
//   //   httpBackend.verifyNoOutstandingRequest();
//   // });
//
//   it('initializes with a proper scope', function() {
//     console.log(controller);
//     // expect(controller.achievements).toEqual([]);
//   });
//   //
//   // it('has a state', function() {
//   //   expect(controller.state.loading).toBe(false);
//   // });
//   //
//   // it('should have a refresh function', function() {
//   //   expect(controller.refresh).toBeDefined();
//   // });
//   //
//   // it('loading to be false after refreshing is done', function() {
//   //   controller.refresh();
//   //   httpBackend.whenGET('/api/achievement/refresh').respond([]);
//   //   httpBackend.expectGET('/api/achievement/refresh');
//   //   httpBackend.flush();
//   //
//   //   expect(controller.state.loading).toBe(false);
//   // });
//
// });
