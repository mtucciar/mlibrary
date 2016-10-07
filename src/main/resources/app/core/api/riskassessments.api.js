/**
 * Created by mtucciarone on 15/09/2015.
 */
(function() {
    'use strict';

    riskassessmentsAPI.$inject = ['$http', '$q', 'alert'];
    angular.module('app.core')
           .factory('riskassessmentsAPI', riskassessmentsAPI);

    /* @ngInject */
    /**
     * @namespace riskassessmentsAPI
     * @memberOf APIs
     * @param $http
     * @param $q
     * @param alert
     * @returns {{GetRiskAssessment: getRiskAssessment, GetRiskAssessments: getRiskAssessment, CreateRiskAssessment: createRiskAssessment, AddForm: addForm, RemoveForm: removeForm, DeleteRiskAssessment: deleteRiskAssessment, UpdateRiskAssessment: updateRiskAssessment}}
     */
    function riskassessmentsAPI($http, $q, alert) {
        var service = {
            GetRiskAssessment: getRiskAssessment,
            GetRiskAssessments: getRiskAssessment,
            CreateRiskAssessment: createRiskAssessment,
            AddForm: addForm,
            RemoveForm: removeForm,
            DeleteRiskAssessment: deleteRiskAssessment,
            UpdateRiskAssessment: updateRiskAssessment
        };
        var baseURL = '/api/1.0/riskassessments/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.riskassessmentsAPI
         * @param projectName
         * @returns {*}
         */
        function getRiskAssessment(projectName) {
            return $http({
                method: 'GET',
                url: baseURL + (projectName ? window.encodeURIComponent(projectName) : '')
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("raq", "get"));
        }

        /**
         * @memberOf APIs.riskassessmentsAPI
         * @param assessmentObject
         * @returns {*}
         */
        function createRiskAssessment(assessmentObject) {
            return $http({
                method: 'POST',
                url: baseURL,
                data: angular.toJson(assessmentObject)
            })
                .then(function() {
                }, alert.HandleError("raq", "post"));
        }

        /**
         * @memberOf APIs.riskassessmentsAPI
         * @param projectName
         * @param assessmentObject
         * @returns {*}
         */
        function updateRiskAssessment(projectName, assessmentObject) {
            return $http({
                method: 'PUT',
                url: baseURL + window.encodeURIComponent(projectName),
                data: angular.toJson(assessmentObject)
            })
                .then(function() {
                }, alert.HandleError("raq", "put"));
        }

        /**
         * @memberOf APIs.riskassessmentsAPI
         * @param assessmentName
         * @returns {*}
         */
        function deleteRiskAssessment(assessmentName) {
            return $http({
                method: 'DELETE',
                url: baseURL + window.encodeURIComponent(assessmentName)
            })
                .then(function() {
                }, alert.HandleError("raq", "delete"));
        }

        /**
         * @memberOf APIs.riskassessmentsAPI
         * @param projectName
         * @param formObject
         * @param formType
         * @param exists
         * @returns {*}
         */
        // formType is one of [securityControls, recipientTrust]
        function addForm(projectName, formObject, formType, exists) {
            return $http({
                method: exists ? 'PUT' : 'POST',
                url: baseURL + window.encodeURIComponent(projectName) + "/" + formType,
                data: formObject,
                headers: {
                    'Content-Type': 'application/pdf'
                }
            })
                .then(function() {
                    return $q.defer()
                             .resolve();
                }, alert.HandleError("raq", exists ? "put" : "post"));
        }

        /**
         * @memberOf APIs.riskassessmentsAPI
         * @param projectName
         * @param formType
         * @returns {*}
         */
        // formType is one of [securityControls, recipientTrust]
        function removeForm(projectName, formType) {
            return $http({
                method: 'DELETE',
                url: baseURL + window.encodeURIComponent(projectName) + "/" + formType
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("raq", "delete"));
        }
    }
})();
