/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    thresholdsAPI.$inject = ['$http', '$log', 'alert'];
    angular.module('app.core')
           .factory('thresholdsAPI', thresholdsAPI);

    /* @ngInject */
    /**
     * @namespace thresholdsAPI
     * @memberOf APIs
     * @param $http
     * @param $log
     * @param alert
     * @returns {{ComputeJobThreshold: computeJobThreshold, ComputeProjectThreshold: computeProjectThreshold}}
     */
    function thresholdsAPI($http, $log, alert) {
        var service = {
            ComputeJobThreshold: computeJobThreshold,
            ComputeProjectThreshold: computeProjectThreshold
        };
        var baseURL = '/api/1.0/thresholds/';

        return service;
        //////////////////

        /**
         * @memberOf APIs.thresholdsAPI
         * @param projectName
         * @param jobID
         * @returns {*}
         */
        function computeJobThreshold(projectName, jobID) {
            return makeRequest('POST',
                'threshold',
                window.encodeURIComponent(projectName) + '?jobId=' + window.encodeURIComponent(jobID) + '&recipeName=' + window.encodeURIComponent(projectName) + '&operation=computeThreshold',
                '');
        }

        /**
         * @memberOf APIs.thresholdsAPI
         * @param projectName
         * @returns {*}
         */
        function computeProjectThreshold(projectName) {
            return makeRequest('POST',
                'threshold',
                window.encodeURIComponent(projectName) + '?recipeName=' + window.encodeURIComponent(projectName) + '&operation=computeThreshold',
                '');
        }

        /**
         * @memberOf APIs.thresholdsAPI
         * @param method
         * @param dataType
         * @param relativeURL
         * @param logMsg
         * @param headers
         * @param data
         * @returns {*}
         */
        function makeRequest(method, dataType, relativeURL, logMsg, headers, data) {
            var request = {
                method: method,
                url: baseURL + relativeURL
            };

            if (headers)
                request.headers = headers;
            if (data)
                request.data = data;

            return $http(request)
                .then(function(data) {
                    if (logMsg) {
                        $log.info(logMsg);
                        $log.info(data.data);
                    }
                    return data.data;
                }, alert.HandleError(dataType, method.toLowerCase()));
        }
    }
})();
