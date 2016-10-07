/**
 * Created by mtucciarone on 12/08/2015.
 */
(function() {
    'use strict';

    defaultriskassessmentsAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('defaultriskassessmentsAPI', defaultriskassessmentsAPI);

    /* @ngInject */
    /**
     * @namespace defaultriskassessmentsAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetForm: getFormAtLevel, GetFormAtLevel: getFormAtLevel}}
     */
    function defaultriskassessmentsAPI($http, alert) {
        var service = {
            GetForm: getFormAtLevel,
            GetFormAtLevel: getFormAtLevel
        };
        var baseURL = '/api/1.0/defaultriskassessments/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.defaultriskassessmentsAPI
         * @param formType
         * @param level
         * @returns {*}
         */
        function getFormAtLevel(formType, level) {
            var request = {
                method: 'GET',
                url: baseURL + formType + (level ? '/' + level : '')
            };
            if (level) {
                request.headers = {
                    'Accept': 'application/pdf'
                };
                request.responseType = 'arraybuffer';
            }
            return $http(request)
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("raq", "get"));
        }
    }
})();
