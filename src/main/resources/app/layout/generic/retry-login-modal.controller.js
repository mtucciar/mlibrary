/**
 * Created by mtucciarone on 10/09/2015.
 */
(function() {
    RetryModal.$inject = ['$modalInstance', 'tokensAPI', 'auth', 'access', 'alert'];
    angular.module('app.layout')
           .controller('RetryModal', RetryModal);

    /* @ngInject */
    function RetryModal($modalInstance, tokensAPI, auth, access, alert) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.user = {};
        vm.Relogin = relogin;
        vm.Cancel = cancel;

        //////////////////

        function relogin() {
            var base64UserNamePwd = $.base64.encode(vm.user.name + ":" + vm.user.password);
            var userCredentials = "Basic " + base64UserNamePwd;
            tokensAPI.GetToken(userCredentials)
                     .then(function(token) {
                             vm.user = token.user;
                             access.Login(token);
                             auth.loginConfirmed('success', function(config) {
                                 config.headers.Authorization = "Bearer " + token.token;
                                 return config;
                             });
                             // Will resolve the promise
                             $modalInstance.close();
                         },
                         function(data) {
                             vm.error = alert.ErrorWriterModal(data, moduleName, '01', 'Error signing in the user');
                         });
        }

        function cancel() {
            // Will reject the promise
            $modalInstance.dismiss();
        }

    }
})();