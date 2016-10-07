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
                name: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'layout/login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            }
        ];
    }
})();