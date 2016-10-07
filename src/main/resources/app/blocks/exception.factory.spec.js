/**
 * Created by kanam on 05/02/2016.
 */

describe('Exception factory: ', function() {

    beforeEach(module('blocks.alert', function($provide) {
        var config = {};
        $provide.value('config', config);
    }));

    beforeEach(module('blocks.exception'));

    describe('Test specs: ', function() {

        var factory = null;
        var alert = null;

        beforeEach(inject(function(_$exceptionHandler_, _alert_) {
            factory = _$exceptionHandler_;
            alert = _alert_;
        }));

        it('Should get the factory:', function() {
            expect(factory)
                .not
                .toBe(undefined);
        });

        it('Should treat an alert message: ', function() {
            var cause = 'Human error...';
            var exception = {
                stack: 'Exception stack...',
                message: 'Exception message...'
            };

            factory(exception, cause);

            expect(alert.alerts[0].id)
                .toEqual(1);
            expect(alert.alerts[0].type)
                .toEqual('alert');
            expect(alert.alerts[0].msg)
                .toEqual('EC.IJS - Internal Javascript error. Please do one of the following: 1) Install a newer version of your browser. 2) Re-login and attempt the process again. 3) Contact Customer Support');
            expect(alert.alerts[0].detailedMsg)
                .toEqual('Exception stack...: Exception message... (caused by "Human error...")');
            expect(alert.alerts[0].expanded)
                .toBe(false);
        });

        it('Should treat tow alert messages: ', function() {
            var cause1 = 'Human error(1)...';
            var exception1 = {
                stack: 'Exception stack(1)...',
                message: 'Exception message(1)...'
            };
            var cause2 = 'Human error(2)...';
            var exception2 = {
                stack: 'Exception stack(2)...',
                message: 'Exception message(2)...'
            };

            expect(alert.alerts.length)
                .toEqual(0);
            factory(exception1, cause1);
            factory(exception2, cause2);
            expect(alert.alerts.length)
                .toEqual(2);

            expect(alert.alerts[0].id)
                .toEqual(1);
            expect(alert.alerts[0].type)
                .toEqual('alert');
            expect(alert.alerts[0].msg)
                .toEqual('EC.IJS - Internal Javascript error. Please do one of the following: 1) Install a newer version of your browser. 2) Re-login and attempt the process again. 3) Contact Customer Support');
            expect(alert.alerts[0].detailedMsg)
                .toEqual('Exception stack(1)...: Exception message(1)... (caused by "Human error(1)...")');
            expect(alert.alerts[0].expanded)
                .toBe(false);

            expect(alert.alerts[1].id)
                .toEqual(2);
            expect(alert.alerts[1].type)
                .toEqual('alert');
            expect(alert.alerts[1].msg)
                .toEqual('EC.IJS - Internal Javascript error. Please do one of the following: 1) Install a newer version of your browser. 2) Re-login and attempt the process again. 3) Contact Customer Support');
            expect(alert.alerts[1].detailedMsg)
                .toEqual('Exception stack(2)...: Exception message(2)... (caused by "Human error(2)...")');
            expect(alert.alerts[1].expanded)
                .toBe(false);
        });
    });
});