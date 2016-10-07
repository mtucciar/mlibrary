/**
 * Created by gbradley on 18/12/2014.
 */
(function() {
    'use strict';

    Alert.$inject = ['alert'];
    angular.module('blocks.alert')
           .controller('Alert', Alert);

    /* @ngInject */
    /**
     * @namespace Alert
     * @memberOf Controllers
     * @param alert
     * @constructor
     */
    function Alert(alert) {
        var vm = this;

        vm.alerts = alert.alerts;
        vm.Expand = setState(true);
        vm.Collapse = setState(false);
        vm.CloseAlert = alert.RemoveAlert;

        /**
         * @memberOf Controllers.Alert
         * @param state
         * @returns {Function}
         */
        function setState(state) {
            return function(alert) {
                alert.expanded = state;
            };
        }
    }
})();