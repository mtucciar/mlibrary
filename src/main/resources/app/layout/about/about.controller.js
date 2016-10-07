/**
 * Created by mtucciarone on 10/08/2015.
 */
(function() {

    About.$inject = ['$modalInstance', 'config'];
    angular.module('app.layout')
           .controller('About', About);

    /* @ngInject */
    function About($modalInstance, config) {
        var vm = this;

        vm.appName = config.appTitle;
        vm.appVersion = config.version;
        vm.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };
    }
})();