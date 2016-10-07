/**
 * Created by mtucciarone on 22/07/2015.
 * @namespace APIs
 */
(function() {
    'use strict';

    classifyAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('classifyAPI', classifyAPI);

    /* @ngInject */
    /**
     * @namespace classifyAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{ClassifyModel: classifyModel}}
     */
    function classifyAPI($http, alert) {
        var service = {
            ClassifyModel: classifyModel
        };
        var baseURL = '/api/1.0/classify/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.classifyAPI
         * @param model
         * @returns {*}
         */
        function classifyModel(model) {
            return $http({
                method: 'POST',
                url: baseURL,
                headers: {
                    'Content-Type': 'application/vnd.privacyanalytics.datamodel+json'
                },
                data: angular.toJson(model)
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("post"));
        }
    }
})();
