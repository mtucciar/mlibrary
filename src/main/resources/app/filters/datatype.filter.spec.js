/**
 * Created by kanam on 26/01/2016.
 */

describe('Pretty data type filter: ', function() {

    beforeEach(module('app.filters'));

    describe('Test specs: ', function() {

        var filter;

        beforeEach(inject(function(_$filter_) {
            filter = _$filter_;
        }));

        it('Should find prettyDataType: ', function() {
            expect(filter('prettyDataType')).not.toBeNull();
        });

        it('Should verify various supported data types: ', function() {
            var prettyDataType = filter('prettyDataType');

            expect(prettyDataType('STRING')).toBe('String');
            expect(prettyDataType('STRING')).not.toBe('Unsupported');

            expect(prettyDataType('TIMESTAMP')).toBe('Date');
            expect(prettyDataType('TIMESTAMP')).not.toBe('Unsupported');

            expect(prettyDataType('DATE')).toBe('Date');
            expect(prettyDataType('DATE')).not.toBe('Unsupported');

            expect(prettyDataType('LONG')).toBe('Long');
            expect(prettyDataType('LONG')).not.toBe('Unsupported');

            expect(prettyDataType('DOUBLE')).toBe('Double');
            expect(prettyDataType('DOUBLE')).not.toBe('Unsupported');

            expect(prettyDataType('UNSUPPORTED')).toBe('Unsupported');
            expect(prettyDataType('ABCD')).toBe('Unsupported');
        });
    });
});