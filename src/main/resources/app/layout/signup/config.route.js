/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.layout')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'signup',
                config: {
                    url: '/signup',
                    templateUrl: 'layout/signup/signup.html',
                    controller: 'SignUp',
                    controllerAs: 'vm',
                    title: 'Sign Up'
                }
            }
        ];
    }
})();