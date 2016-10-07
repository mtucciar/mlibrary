/**
 * Created by kanam on 11/02/2016.
 */

describe('Input-validation factory: ', function() {

    beforeEach(module('blocks.inputValidation'));

    describe('Test specs: ', function () {

        var prevalencePercentage;

        beforeEach(inject(function(_prevalencePercentage_) {
            prevalencePercentage = _prevalencePercentage_;
        }));

        it('Should get the factory', function () {
            expect(prevalencePercentage).not.toBe(undefined);
        });

        it('Should validate prevalence percentage: ', function() {
            expect(prevalencePercentage.validate()).toBe(false);
            expect(prevalencePercentage.validate('')).toBe(false);
            expect(prevalencePercentage.validate(' ')).toBe(false);
            expect(prevalencePercentage.validate(-0.000001)).toBe(false);
            expect(prevalencePercentage.validate(0.0)).toBe(false);
            expect(prevalencePercentage.validate(0.000001)).toBe(true);
            expect(prevalencePercentage.validate(0.01)).toBe(true);
            expect(prevalencePercentage.validate(10.01)).toBe(true);
            expect(prevalencePercentage.validate(100)).toBe(true);
            expect(prevalencePercentage.validate(100.00)).toBe(true);
            expect(prevalencePercentage.validate(100.01)).toBe(false);
            expect(prevalencePercentage.validate(1000)).toBe(false);
        });
    });
});