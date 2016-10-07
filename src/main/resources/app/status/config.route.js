/**
 * Created by mtucciarone on 15/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.status')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'status',
                config: {
                    url: '/status',
                    templateUrl: 'status/status.html',
                    controller: 'Status',
                    controllerAs: 'vm',
                    title: 'Home',
                    helpPage: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-home fa-lg pad-right-2 pad-top"></i><b>Home</b>',
                        enabled: true
                    }
                }
            }
        ];
    }
})();