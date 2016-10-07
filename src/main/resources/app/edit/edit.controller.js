/**
 * Created by mtucciarone on 17/08/2015.
 */
(function() {
    Edit.$inject = ['emailAPI', 'tools', 'alert', 'currentProject'];
    angular.module('app.edit')
           .controller('Edit', Edit);

    /* @ngInject */
    function Edit(emailAPI, tools, alert, currentProject) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.edit";

        vm.HasLoaded = false;
        vm.SubmitEmail = submitEmail;

        loadPage();

        //////////////////

        function loadPage() {
            vm.HasLoaded = true;
        }

        function submitEmail() {
            tools.log.info("i am called");
            if (!angular.isDefined(vm.email)) {
                vm.Message = "Email is empty";
            }
            else {
                var emailObj = {
                    email: vm.email
                };
                emailAPI.SubmitEmail(emailObj)
                    .then(function(returnJson) {
                        vm.Message = "Your email has been successfully submitted!";
                    }, function(error) {
                        tools.log.info(error);
                        vm.Message = error.data.errors.email[0];
                    });
                // submit;
            }
        }
    }
})();