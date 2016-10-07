/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.add')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'add.wizard',
                config: {
                    templateUrl: 'add/add.wizard.html',
                    controller: 'LibraryWizard',
                    controllerAs: 'vm',
                    title: 'Library Setup'
                }
            }
        ];
    }
})();