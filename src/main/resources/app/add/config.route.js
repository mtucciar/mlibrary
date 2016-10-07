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
        /* @ngInject */
        getCurrentProject.$inject = ['jsonStorage', 'router', 'alert', 'tools'];
        function getCurrentProject(jsonStorage, router, alert, tools) {
            var currentProjectName = tools.cookies.get("currentProjectName");
            if (!angular.isDefined(currentProjectName)) {
                alert.ErrorWriterNoCallback('app.add', '99', 'Project is not loaded');
                router.resetRoutes();
                router.go("status");
                return;
            }
            return jsonStorage.GetProjectByName(currentProjectName);
        }

        return [
            {
                name: 'add',
                config: {
                    url: '/add',
                    templateUrl: 'add/add.html',
                    controller: 'Add',
                    controllerAs: 'vm',
                    title: 'Add',
                    helpPage: 'Add',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-plus fa-lg pad-right-2 pad-top"></i><b>Add</b>',
                        enabled: false
                    },
                    resolve: {
                        currentProject: getCurrentProject
                    }
                }
            }
        ];
    }
})();