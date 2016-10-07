/**
 * Created by kanam on 11/02/2016.
 */

describe('Idler controller: ', function() {

    beforeEach(module('blocks.idler'));

    describe('Test specs: ', function () {

        var controller = null;

        beforeEach(inject(function($controller) {
            controller = $controller;
        }));

        it('Should get the controller', function () {
            expect(controller).not.toBe(undefined);
        });
    });

});