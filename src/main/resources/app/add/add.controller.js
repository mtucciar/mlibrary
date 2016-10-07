/**
 * Created by mtucciarone on 24/06/2015.
 */
(function() {
    Add.$inject = ['tools', 'alert', 'router', 'currentProject'];
    angular.module('app.add')
           .controller('Add', Add);

    /* @ngInject */
    function Add(tools, alert, router, currentProject) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.add";

        vm.HasLoaded = false;

        loadPage();

        //////////////////

        function loadPage() {
            if (currentProject) {
                vm.HasLoaded = true;
                tools.log.info('going to wizard');
                router.go('add.wizard');
            }
            else {
                alert.ErrorWriterNoCallback('app.add', '22', 'Error getting project');
                router.go("status");
            }
        }
    }
})();