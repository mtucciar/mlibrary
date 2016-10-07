/**
 * Created by kanam on 01/02/2016.
 */

describe('Access factory: ', function() {

    beforeEach(module('blocks.access', function($provide) {
        var tools = {};
        $provide.value('tools', tools);

        var alert = {
            'HandleError': jasmine.createSpy()
        };
        $provide.value('alert', alert);
    }));

    describe('Test specs: ', function() {
        var access;

        beforeEach(inject(function(_access_) {
            access = _access_;
        }));

        it('Should get the factory: ', function() {
            expect(access).not.toBe(undefined);
        });

        //it('Should get access token: ', function() {
        //    var loginResponse = {
        //        token: 'admin:admin',
        //        user: 'admin'
        //    };
        //    console.log(access);
        //    access.Login(loginResponse);
        //    console.log(access);
        //
        //    console.log(access.getGroups());
        //});

        //it('Should get the groups: ', function() {
        //    //var data;
        //    //console.log(access.getGroups());
        //
        //    var result;
        //
        //    access.getGroups().then(function(returnFromPromise) {
        //        result = returnFromPromise;
        //    });
        //
        //    //console.log(result);
        //
        //});
        //
        //it('Should get user full-name: ', function() {
        //    //access.user = {name: "AdddddMin"};
        //    //console.log(access.GetUserFullName());
        //});
    });
});