/**
 * Created by mtucciarone on 01/05/2015.
 */
(function() {
    StartProjectModalCtrl.$inject = ['$modalInstance', 'jsonStorage', 'alert', 'router', 'tools'];
    angular.module('app.status')
           .controller('StartProject', StartProjectModalCtrl);

    /* @ngInject */
    function StartProjectModalCtrl($modalInstance, jsonStorage, alert, router, tools) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.status";

        vm.Create = create;
        vm.cancel = cancel;

        loadPage();

        //////////////////

        function create(project) {

            var currentDate = new Date();

            var JsonProject = {
                id: currentDate.getUTCMilliseconds(),
                name: project.name,
                created: currentDate,
                files: []
            };

            jsonStorage.CreateProject(JsonProject);

            tools.log.info(JSON.stringify(JsonProject));
            tools.log.info('Added new project: ' + JsonProject.id);
            alert.SuccessWriter("created project '" + JsonProject.name + "'");
            tools.cookies.put('currentProjectName', JsonProject.name);
            router.go('add');
            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function loadPage() {
            vm.project = {};
        }

    }
})();