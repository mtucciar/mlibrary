/**
 * Created by mtucciarone on 23/07/2015.
 */
(function() {
    'use strict';

    tokensAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('tokensAPI', tokensAPI);

    /* @ngInject */
    /**
     * @namespace tokensAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetToken: getToken}}
     */
    function tokensAPI($http, alert) {
        var service = {
            GetToken: getToken
        };
        var baseURL = '/api/1.0/tokens';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.tokensAPI
         * @param userCredentials
         * @returns {*}
         */
        function getToken(userCredentials) {
            return $http({
                method: 'GET',
                url: baseURL,
                ignoreAuthModule: true,
                headers: {
                    'Authorization': userCredentials
                }
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("token", "get"));
        }
    }
})();
