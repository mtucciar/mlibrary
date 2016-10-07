/**
 * Created by jkane on 16/09/2015.
 */
(function() {
    'use strict';

    reportsAPI.$inject = ['$http', '$log', 'alert'];
    angular.module('app.core')
           .factory('reportsAPI', reportsAPI);

    /* @ngInject */
    /**
     * @namespace reportsAPI
     * @memberOf APIs
     * @param $http
     * @param $log
     * @param alert
     * @returns {{GetReport: getReport}}
     */
    function reportsAPI($http, $log, alert) {
        var service = {
            GetReport: getReport
        };
        var baseURL = '/api/1.0/reports/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.reportsAPI
         * @param reportContentType
         * @param jobId
         * @param thresholdRecipeName
         * @param isPreDeid
         * @returns {*}
         */
        function getReport(reportContentType, jobId, thresholdRecipeName, isPreDeid) {
            var reportName = (reportContentType === 'application/pdf') ? isPreDeid ? 'summaryPredeid' : 'summaryPostdeid' : isPreDeid ? 'comprehensivePredeid' : 'comprehensivePostdeid';
            var includeRaqs = (reportContentType === 'application/zip') ? 'true' : 'false';

            // XMLHttpRequest objects must have responseType = arrayBuffer in order to construct a blob from the response data
            return $http({
                method: 'GET',
                headers: {
                    'Accept': reportContentType
                },
                responseType: 'arraybuffer',
                url: baseURL + reportName + '/job/' + window.encodeURIComponent(jobId) + '?threshold=' + window.encodeURIComponent(thresholdRecipeName) + '&includeRaqs=' + includeRaqs
            })
                .then(function(data) {
                    $log.info(data.headers("Content-Type"));
                    data.contentType = data.headers("Content-Type");
                    return data;
                }, alert.HandleError("report", "get"));
        }
    }
})();