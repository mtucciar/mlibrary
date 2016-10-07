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
                name: 'profile',
                config: {
                    url: '/profile',
                    templateUrl: 'layout/profile/profile.html',
                    helpPage: 'Profile',
                    controller: 'Profile',
                    controllerAs: 'vm',
                    title: 'Profile'
                }
            }
        ];
    }
})();