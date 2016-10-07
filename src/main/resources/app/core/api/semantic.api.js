/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    semanticAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('semanticAPI', semanticAPI);

    /* @ngInject */
    /**
     * @namespace semanticAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetNames: *, GetTypes: *, GetNamesWithCollection: *}}
     */
    function semanticAPI($http, alert) {
        var service = {
            GetNames: makeRequestBuilder('names'),
            GetTypes: makeRequestBuilder('types'),
            GetNamesWithCollection: makeRequestBuilder('namesWithCollection')
        };
        var baseURL = '/api/1.0/semantic/';

        return service;
        //////////////////

        /**
         * @memberOf APIs.semanticAPI
         * @param relativeURL
         * @returns {Function}
         */
        function makeRequestBuilder(relativeURL) {
            return function() {
                return $http({
                    method: 'GET',
                    url: baseURL + relativeURL
                })
                    .then(function(data) {
                        return data.data;
                    }, alert.HandleError('semantic', 'get'));
            };
        }
    }
})();
