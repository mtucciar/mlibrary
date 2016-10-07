/**
 * Created by mtucciarone on 01/09/2015.
 */
(function() {
    'use strict';

    exceptionHandler.$inject = ['$injector'];
    angular.module('blocks.exception')
           .factory('$exceptionHandler', exceptionHandler);

    /* @ngInject */
    /**
     * @namespace exceptionHandler
     * @memberOf Factories
     * @param $injector
     * @returns {Function}
     */
    function exceptionHandler($injector) {
        return function(exception, cause) {
            var alert = $injector.get("alert");
            alert.AddAlert('alert', "EC.IJS - Internal Javascript error. Please do one of the following: 1) Install a newer version of your browser. 2) Re-login and attempt the process again. 3) Contact Customer Support", exception.stack + ": " + exception.message + ' (caused by "' + cause + '")', 90000);
        };
    }
})();
