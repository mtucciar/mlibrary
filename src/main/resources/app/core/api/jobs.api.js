/**
 * Created by mtucciarone on 11/08/2015.
 */
(function() {
    'use strict';

    emailAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('emailAPI', emailAPI);

    /* @ngInject */
    /**
     * @namespace jobsAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetJob: getJob, GetProjectJobs: getProjectJobs, GetAllJobs: getJob, DeleteJob: deleteJob, GetLexiconJobResult: *, GetRMJobResult: *, GetEclipseJobResult: *, GetJobResultProject: getJobResultProject, GetJobResultRecipe: getJobResultRecipe}}
     */
    function emailAPI($http, alert) {
        var service = {
            SubmitEmail: submitEmail
        };
        var baseURL = 'http://shopify-fed-test.herokuapp.com/emails.json';

        return service;
        //////////////////

        function submitEmail(emailObj) {
            return $http({
                method: 'POST',
                url: baseURL,
                data: emailObj
            })
                .then(function(data) {
                    return data;
                }, alert.HandleError("job", "get"));
        }
    }
})();
