(function() {
    'use strict';

    Login.$inject = ['tools', '$window', 'Idle', 'access', 'config', 'alert', 'tokensAPI', 'usersAPI', '$state'];
    angular.module('app.layout')
           .controller('Login', Login);

    /* @ngInject */
    function Login(tools, $window, Idle, access, config, alert, tokensAPI, usersAPI, $state) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.Login = login;

        loadPage();

        //////////////////

        function loadPage() {
            // always ensure the user is not logged in
            access.accessToken = null;
            access.isLoggedIn = false;

            vm.applicationName = config.appTitle + " " + config.version;
            vm.user = {};
            vm.loggedIn = false;
        }

        function login() {
            access.login();
            $state.go('status');
        }
    }
})();