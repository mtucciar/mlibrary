/**
 * Created by mtucciarone on 05/05/2015.
 */
(function() {
    SignUp.$inject = ['alert', 'tools', 'access', '$state'];
    angular.module('app.layout')
           .controller('SignUp', SignUp);

    /* @ngInject */
    function SignUp(alert, tools, access, $state) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.SignUp = signUp;

        //////////////////

        function signUp() {
            vm.IsWorking = true;

            if (vm.modelUser.password !== vm.modelUser.verifyPassword) {
                alert.ErrorWriterNoCallback(moduleName, '02', 'Passwords do not match');
                vm.signupForm.verifyPassword.$invalid = true;
                vm.signupForm.verifyPassword.$valid = false;
                vm.signupForm.verifyPassword.valdrViolations = [
                    {
                        field: 'verifyPassword',
                        message: 'Must match the password',
                        type: 'User',
                        valid: 'false',
                        value: vm.modelUser.verifyPassword
                    }
                ];
                vm.IsWorking = false;
                return;
            }
            access.user = {
                name: vm.modelUser.name,
                displayName: vm.modelUser.name
            };
            $state.go("login");
        }

    }
})();