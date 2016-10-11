import { assert } from 'chai';

import { TowerController } from './../../controllers/';

let controller;

describe('TowerController', function() {

    beforeEach(function() {
        controller = new TowerController();
    });

    it('should work', () => {
      console.log(controller.MapService);
      assert.equal(controller.state.loading, true);
    });

    //
    // it('should intitialize with loading state', inject(function ($state) {
    //     assert.equal(controller.state.loading, true);
    // }));
    //
    // it('should accept initial counter value as dependency', function () {
    //     component = new SomeComponent(30);
    //     assert.equal(component.counter, 30);
    // });
    //
    // it('should increment counter value after increment is called', function () {
    //     assert.equal(component.counter, 20);
    //     component.increment();
    //     assert.equal(component.counter, 21);
    // });

});
