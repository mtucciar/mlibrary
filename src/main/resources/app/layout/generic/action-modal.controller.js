/**
 * Created by mtucciarone on 23/06/2015.
 */
(function() {
    ActionModal.$inject = ['$modalInstance', 'object', 'action', 'explanation'];
    angular.module('app.layout')
           .controller('ActionModal', ActionModal);

    /* @ngInject */
    function ActionModal($modalInstance, object, action, explanation) {
        var vm = this;
        vm.TheObject = object ? object : "";
        vm.TheAction = action ? action : "";
        vm.TheExplanation = explanation ? explanation : "";
        vm.Yes = function() { $modalInstance.close(true); };
        vm.No = function() { $modalInstance.close(false); };
    }
})();