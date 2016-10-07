/**
 * Created by kanam on 27/01/2016.
 */

describe('Alert controller: ', function() {

    beforeEach(module('blocks.alert', function($provide) {
        var config = {};
        $provide.value('config', config);
    }));

    describe('Test specs: ', function() {

        var controller = null;
        var alert = null;

        beforeEach(inject(function($controller, _alert_) {
            controller = $controller;
            alert = _alert_;
        }));

        it('Should get the controller', function() {
            var vm = controller('Alert', {alert: alert});
            expect(vm).not.toBe(undefined);
        });

        it('Should expand an alert: ', function() {
            var data0 = {
                'id': 0,
                'type': 'success',
                'msg': 'Successful',
                'detailedMsg': 'The operation is successful!',
                'expanded': false
            };

            var data1 = {
                'id': 1,
                'type': 'success',
                'msg': 'Successful',
                'detailedMsg': 'The operation is successful!',
                'expanded': false
            };

            var vm = controller('Alert', {alert: alert});
            expect(vm.alerts.length).toEqual(0);
            vm.alerts.push(data0);
            vm.alerts.push(data1);
            expect(vm.alerts.length).toEqual(2);
            expect(vm.alerts[0].expanded).toBe(false);
            expect(vm.alerts[1].expanded).toBe(false);
            vm.Expand(data0);
            expect(vm.alerts[0].expanded).toBe(true);
            expect(vm.alerts[1].expanded).toBe(false);
        });

        it('Should collapse an alert: ', function() {
            var data0 = {
                'id': 0,
                'type': 'success',
                'msg': 'Successful',
                'detailedMsg': 'The operation is successful!',
                'expanded': false
            };

            var data1 = {
                'id': 1,
                'type': 'success',
                'msg': 'Successful',
                'detailedMsg': 'The operation is successful!',
                'expanded': false
            };

            var vm = controller('Alert', {alert: alert});
            expect(vm.alerts.length).toEqual(0);
            vm.alerts.push(data0);
            vm.alerts.push(data1);
            expect(vm.alerts.length).toEqual(2);
            expect(vm.alerts[0].expanded).toBe(false);
            expect(vm.alerts[1].expanded).toBe(false);
            vm.Expand(data0);
            expect(vm.alerts[0].expanded).toBe(true);
            expect(vm.alerts[1].expanded).toBe(false);
            vm.Collapse(data0);
            expect(vm.alerts[0].expanded).toBe(false);
            expect(vm.alerts[1].expanded).toBe(false);
        });

        it('Should close alerts: ', function() {
            var data0 = {
                'id': 0,
                'type': 'success',
                'msg': 'Successful',
                'detailedMsg': 'The operation is successful!',
                'expanded': true
            };

            var data1 = {
                'id': 1,
                'type': 'danger',
                'msg': 'Dangerous',
                'detailedMsg': 'The operation is very very dangerous!',
                'expanded': false
            };

            var data2 = {
                'id': 2,
                'type': 'warning',
                'msg': 'Warning',
                'detailedMsg': 'Well, the operation is not so good!',
                'expanded': false
            };

            var vm = controller('Alert', {alert: alert});
            expect(vm.alerts.length).toEqual(0);
            vm.alerts.push(data0);
            vm.alerts.push(data1);
            vm.alerts.push(data2);
            expect(vm.alerts.length).toEqual(3);
            vm.CloseAlert(data1.id);
            expect(vm.alerts.length).toEqual(2);
            vm.CloseAlert(data0.id);
            expect(vm.alerts.length).toEqual(1);
            vm.CloseAlert(data2.id);
            expect(vm.alerts.length).toEqual(0);
        });
    });

});

