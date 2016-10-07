/**
 * Created by mtucciarone on 24/06/2015.
 */
(function() {
    LibraryWizard.$inject = ['tools', 'configAPI', 'jsonStorage', 'alert', 'router'];
    angular.module('app.add')
           .controller('LibraryWizard', LibraryWizard);

    /* @ngInject */
    function LibraryWizard(tools, configAPI, jsonStorage, alert, router) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.add";

        vm.navigationItems = jsonStorage.getItem("add.wizard", "navigationItems");
    }
})();