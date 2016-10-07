/**
 * Created by mtucciarone on 28/04/2015.
 */
(function() {
    Profile.$inject = ['usersAPI', 'tokensAPI', 'Idle', 'access', 'alert', 'tools'];
    angular.module('app.layout')
           .controller('Profile', Profile);

    /* @ngInject */
    function Profile(usersAPI, tokensAPI, Idle, access, alert, tools) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.displayNameUnlocked = false;
        vm.emailUnlocked = false;
        vm.tempInput = {};
        vm.isEditingInput = false;
        vm.StartEditInput = startEditInput;
        vm.DiscardInputChanges = discardInputChanges;
        vm.SaveChangesInput = saveChangesInput;
        vm.ChangePassword = changePassword;

        loadPage();

        //////////////////

        function loadPage() {
            vm.user = access.getUser();
        }

        function startEditInput(type, input) {
            vm.isEditingInput = true;
            if (type === "name") {
                vm.displayNameEdit = true;
                vm.tempInput.name = input;
            }
            else {
                vm.emailEdit = true;
                vm.tempInput.email = input;
            }
        }

        function discardInputChanges(type) {
            vm.isEditingInput = false;
            if (type === "name")
                vm.displayNameEdit = false;
            else
                vm.emailEdit = false;
        }

        function saveChangesInput(type) {
            if (type === "name") {
                vm.user.displayName = (vm.tempInput.name || vm.user.name);
            }
            else {
                vm.user.email = vm.tempInput.email;
            }

            usersAPI.EditUser(vm.user)
                    .then(function(user) {
                        vm.user = user;
                        access.user = user;
                    }, alert.ErrorWriter(moduleName, '02', 'Error updating user'));
            vm.displayNameEdit = false;
            vm.emailEdit = false;
            vm.tempInput = {};
            vm.isEditingInput = false;
        }

        function changePassword(updatedPassword) {
            usersAPI.UpdatePassword(vm.user.id, updatedPassword)
                    .then(function() {
                        alert.SuccessWriter("updated password!");
                        var base64UserNamePwd = $.base64.encode(vm.user.name + ":" + updatedPassword.verifyNewPwd);
                        var userCredentials = "Basic " + base64UserNamePwd;
                        tokensAPI.GetToken(userCredentials)
                                 .then(function(token) {
                                     Idle.watch();
                                     vm.user = token.user;
                                     access.Login(token)
                                           .then(function() {
                                               updatedPassword.currentPwd = "";
                                               updatedPassword.newPwd = "";
                                               updatedPassword.verifyNewPwd = "";
                                               vm.profileForm.$setPristine();
                                               tools.log.info("replaced old token with new token");
                                           });
                                 }, alert.ErrorWriter(moduleName, '04', 'Failed to re-login user'));
                    }, alert.ErrorWriter(moduleName, '03', 'Error updating password'));
        }

    }
})();