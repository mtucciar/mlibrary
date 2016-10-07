/**
 * Created by mtucciarone on 23/04/2015.
 */
(function() {
    StatusCtrl.$inject = ['alert', 'router', 'jsonStorage', 'tools', 'config'];
    angular.module('app.status')
           .controller('Status', StatusCtrl);

    /* @ngInject */
    function StatusCtrl(alert, router, jsonStorage, tools, config) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.status";

        vm.appId = config.appId;
        vm.HasLoaded = false;
        vm.CurrentProjectList = [];
        vm.LoadProject = loadProject;
        vm.StartProject = startProject;
        vm.DeleteProject = deleteProject;
        vm.CapitalizeString = tools.CapitalizeString;

        loadPage();

        //////////////////

        function loadPage() {
            getProjects();
            vm.HasLoaded = true;
        }

        function getProjects() {
            vm.CurrentProjectList = jsonStorage.GetProjects();
            tools.log.info(vm.CurrentProjectList);
            sortProjects();
        }

        function loadProject(project) {
            tools.cookies.put('currentProjectName', project.name);
            if (angular.isDefined(project.files) && project.files.length > 0) {
                router.go('edit');
            }
            else {
                router.go('add', true);
            }
        }

        function startProject() {
            tools.modal.open({
                templateUrl: 'status/projectmodal/startproject-modal.html',
                controller: 'StartProject',
                controllerAs: 'vm'
            });
        }

        function sortProjects() {
            vm.CurrentProjectList.sort(function(a, b) {
                return new Date(b.updated).getTime() - new Date(a.updated).getTime();
            });
        }

        function deleteProject(project, projectIndex) {
            tools.modal.open({
                templateUrl: 'layout/generic/action-modal.html',
                controller: 'ActionModal',
                controllerAs: 'vm',
                resolve: {
                    object: function() {
                        return project.name;
                    },
                    action: function() {
                        return "delete";
                    },
                    explanation: function() {
                        return "";
                    }
                }
            })
                 .result
                 .then(function(result) {
                     if (result) {
                         jsonStorage.DeleteProject(projectIndex);
                         getProjects();
                     }
                 });
        }

    }
})();