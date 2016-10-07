/**
 * Created by kanam on 29/01/2016.
 */
describe('Alert factory: ', function() {

    beforeEach(module('blocks.alert', function($provide) {
        var config = {
            appErrorPrefix: 'Quantum Galactic-'
        };
        $provide.value('config', config);
    }));

    describe('Test specs: ', function() {

        var factory;

        beforeEach(inject(function(_alert_) {
            factory = _alert_;
        }));

        it('Should get the factory', function() {
            expect(factory).not.toBe(undefined);
            console.log(factory);
        });

        it('Should add alert: ', function() {
            expect(factory.alerts.length).toEqual(0);
            factory.AddAlert('success', 'Success', 'Operation is very very successful!');
            expect(factory.alerts.length).toEqual(1);
            expect(factory.alerts[0].id).toEqual(1);
            expect(factory.alerts[0].msg).toEqual('Success');
            expect(factory.alerts[0].detailedMsg).toEqual('Operation is very very successful!');
            expect(factory.alerts[0].expanded).toBe(false);
        });

        it('Should remove alert: ', function() {
            expect(factory.alerts.length).toEqual(0);
            factory.AddAlert('success', 'Success', 'Operation is very very successful!');
            factory.AddAlert('warning', 'Warning', 'Operation is very very bad!');
            factory.AddAlert('danger', 'Danger', 'Operation is very very dangerous!!!');
            expect(factory.alerts.length).toEqual(3);
            factory.RemoveAlert(1);
            expect(factory.alerts.length).toEqual(2);
            expect(factory.alerts[1].id).toEqual(3);
            expect(factory.alerts[1].msg).toEqual('Danger');
            expect(factory.alerts[1].detailedMsg).toEqual('Operation is very very dangerous!!!');
        });

        it('Should write an error: ', function() {
            expect(factory.alerts.length).toEqual(0);
            var data = {
                data: {
                    uiMessage : 'Testing 123...',
                    errorMessage: 'This is the detailed testing message'
                }
            };
            factory.ErrorWriter('app.add', '401', 'Hello World!')(data);

            expect(factory.alerts.length).toEqual(1);
            expect(factory.alerts[0].id).toEqual(1);
            expect(factory.alerts[0].msg).toEqual('Quantum Galactic-ADD401 - Hello World!: Testing 123...');
            expect(factory.alerts[0].detailedMsg).toEqual('This is the detailed testing message');
        });

        it('Should write an error modal: ', function() {
            expect(factory.alerts.length).toEqual(0);
            var data = {
                data: {
                    uiMessage: 'Testing 123...',
                    errorMessage: 'This is the detailed testing message'
                }
            };
            var modal = factory.ErrorWriterModal(data, 'app.edit', '401', 'Hello World!');

            expect(modal.msg).toEqual('Quantum Galactic-ED401 - Hello World!: Testing 123...');
            expect(modal.detailedMsg).toEqual('This is the detailed testing message');
        });

        it('Should handle error code 401: ', function() {
            var data = {data: {code: '401'}};
            factory.HandleError('token')(data);
            expect(data.data.code).toEqual('401');
            expect(data.data.uiMessage).toEqual('401 Incorrect username and/or password');

            data = {data: {code: '401'}};
            factory.HandleError('user', 'get')(data);
            expect(data.data.code).toEqual('401');
            expect(data.data.uiMessage).toEqual('401 You have not gained authorization to view the list of users');

            data = {data: {code: '401'}};
            factory.HandleError('user', 'post')(data);
            expect(data.data.code).toEqual('401');
            expect(data.data.uiMessage).toEqual('401 You have not gained authorization to create a new user or reset their password');

            data = {data: {code: '401'}};
            factory.HandleError('user', 'put')(data);
            expect(data.data.code).toEqual('401');
            expect(data.data.uiMessage).toEqual('401 You have not gained authorization to update this user');

            data = {data: {code: '401'}};
            factory.HandleError('token.user')(data);
            expect(data.data.code).toEqual('401');
            expect(data.data.uiMessage).toEqual('401 You have not gained authorization to make this request');
        });

        it('Should handle error code 400: ', function() {
            var data = {data: {code: '400'}};
            factory.HandleError('job')(data);
            expect(data.data.code).toEqual('400');
            expect(data.data.uiMessage).toEqual('400 Could not get specified Job');

            data = {data: {code: '400'}};
            factory.HandleError('recipethreshold')(data);
            expect(data.data.code).toEqual('400');
            expect(data.data.uiMessage).toEqual('400 Operation could not be completed');

            data = {data: {code: '400'}};
            factory.HandleError('recipetext')(data);
            expect(data.data.code).toEqual('400');
            expect(data.data.uiMessage).toEqual('400 Operation could not be completed');

            data = {data: {code: '400'}};
            factory.HandleError('recipetext', 'post')(data);
            expect(data.data.code).toEqual('400');
            expect(data.data.uiMessage).toEqual('400 You have not supplied any identifiers');

            data = {data: {code: '400'}};
            factory.HandleError('risk')(data);
            expect(data.data.code).toEqual('400');
            expect(data.data.uiMessage).toEqual('400 Operation could not be completed');

            data = {data: {code: '400'}};
            factory.HandleError('threshold')(data);
            expect(data.data.code).toEqual('400');
            expect(data.data.uiMessage).toEqual('400 Operation could not be completed');

            data = {data: {code: '400'}};
            factory.HandleError('job.threshold.risk')(data);
            expect(data.data.code).toEqual('400');
            expect(data.data.uiMessage).toEqual('400 There is a problem with the request');
        });

        it('Should handle error code 403: ', function() {
            var data = {data: {code: '403'}};
            factory.HandleError('content')(data);
            expect(data.data.code).toEqual('403');
            expect(data.data.uiMessage).toEqual('403 You do not have permission to access the requested resource(s)');

            // more test specs to follow
        });
    });

});
