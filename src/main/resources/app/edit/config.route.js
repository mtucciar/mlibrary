/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.edit')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
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
                name: 'edit',
                config: {
                    url: '/edit',
                    templateUrl: 'edit/edit.html',
                    controller: 'Edit',
                    controllerAs: 'vm',
                    title: 'Edit',
                    helpPage: 'Edit',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-pencil fa-lg pad-right-2 pad-top"></i><b>Edit</b>',
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