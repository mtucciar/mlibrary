/**
 * Created by kanam on 26/01/2016.
 */

describe('Classification filter: ', function() {

    beforeEach(module('app.filters'));

    describe('Test specs: ', function() {

        var filter;

        beforeEach(inject(function(_$filter_) {
            filter = _$filter_;
        }));

        it('Should find prettyClassification: ', function() {
            expect(filter('prettyClassification')).not.toBeNull();
        });

        it('Should verify various supported classification types: ', function() {
            var prettyClassification = filter('prettyClassification');

            expect(prettyClassification('DI')).toBe('Direct Identifier');
            expect(prettyClassification('DI')).not.toBe('Please Classify');

            expect(prettyClassification('QI')).toBe('Quasi-Identifier');
            expect(prettyClassification('QI')).not.toBe('Please Classify');

            expect(prettyClassification('NI')).toBe('Non-Identifier');
            expect(prettyClassification('NI')).not.toBe('Please Classify');

            expect(prettyClassification('')).toBe('Please Classify');
            expect(prettyClassification('')).not.toBe('Direct Identifier');
            expect(prettyClassification('')).not.toBe('Quasi-Identifier');
            expect(prettyClassification('')).not.toBe('Non-Identifier');

            expect(prettyClassification(null)).toBe('Please Classify');
            expect(prettyClassification(null)).not.toBe('Direct Identifier');
            expect(prettyClassification(null)).not.toBe('Quasi-Identifier');
            expect(prettyClassification(null)).not.toBe('Non-Identifier');

            expect(prettyClassification(undefined)).toBe('Please Classify');
            expect(prettyClassification(undefined)).not.toBe('Direct Identifier');
            expect(prettyClassification(undefined)).not.toBe('Quasi-Identifier');
            expect(prettyClassification(undefined)).not.toBe('Non-Identifier');

            expect(prettyClassification('ABCD')).toBe('Please Classify');
            expect(prettyClassification('ABCD')).not.toBe('Direct Identifier');
            expect(prettyClassification('ABCD')).not.toBe('Quasi-Identifier');
            expect(prettyClassification('ABCD')).not.toBe('Non-Identifier');
        });
    });
});