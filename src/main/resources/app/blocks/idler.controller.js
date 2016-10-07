/**
 * Created by mtucciarone on 23/09/2015.
 */
(function() {
    'use strict';

    Idler.$inject = ['$scope', 'Idle', 'access', '$modal'];
    angular.module('blocks.idler')
           .controller('Idler', Idler);

    /* @ngInject */
    /**
     * @namespace Idler
     * @memberOf Controllers
     * @param $scope
     * @param Idle
     * @param access
     * @param $modal
     * @constructor
     */
    function Idler($scope, Idle, access, $modal) {
        $scope.started = false;

        $scope.$on('IdleStart', showWarning);
        $scope.$on('IdleEnd', closeModals);
        $scope.$on('IdleTimeout', boot);

        /**
         * @memberOf Controllers.Idler
         */
        function closeModals() {
            if ($scope.warning) {
                $scope.warning.close();
                $scope.warning = null;
            }

            if ($scope.timedout) {
                $scope.timedout.close();
                $scope.timedout = null;
            }
        }

        /**
         * @memberOf Controllers.Idler
         */
        function showWarning() {
            closeModals();

            $scope.warning = $modal.open({
                templateUrl: 'warning-dialog.html',
                windowClass: 'modal-danger'
            });
        }

        /**
         * @memberOf Controllers.Idler
         */
        function boot() {
            closeModals();
            access.logout();
        }

    }
})();