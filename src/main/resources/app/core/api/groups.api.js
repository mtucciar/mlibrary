/**
 * Created by mtucciarone on 03/09/2015.
 */
(function() {
    'use strict';

    groupsAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('groupsAPI', groupsAPI);

    /* @ngInject */
    /**
     * @memberOf groupsAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetGroup: getGroup, GetGroups: getGroup, CreateGroup: createGroup, EditGroup: editGroup, DeleteGroup: deleteGroup}}
     */
    function groupsAPI($http, alert) {
        var service = {
            GetGroup: getGroup,
            GetGroups: getGroup,
            CreateGroup: createGroup,
            EditGroup: editGroup,
            DeleteGroup: deleteGroup
        };
        var baseURL = '/api/1.0/groups/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.groupsAPI
         * @param data
         * @returns {data.data|{uiMessage, errorMessage}|{code}}
         */
        function pass(data) {
            return data.data;
        }

        /**
         * @memberOf APIs.groupsAPI
         * @param groupName
         * @returns {*}
         */
        function getGroup(groupName) {
            return $http.get(baseURL + (groupName ? groupName : ''))
                        .then(pass, alert.HandleError("group", "get"));
        }

        /**
         * @memberOf APIs.groupsAPI
         * @param groupObject
         * @returns {*}
         */
        function createGroup(groupObject) {
            return $http.post(baseURL, groupObject, {responseType: "json"})
                        .then(pass, alert.HandleError("group", "post"));
        }

        /**
         * @memberOf APIs.groupsAPI
         * @param groupObject
         * @returns {*}
         */
        function editGroup(groupObject) {
            return $http.put(baseURL + groupObject.id, groupObject, {responseType: "json"})
                        .then(pass, alert.HandleError("group", "put"));
        }

        /**
         * @memberOf APIs.groupsAPI
         * @param groupID
         * @returns {*}
         */
        function deleteGroup(groupID) {
            return $http.delete(baseURL + groupID)
                        .then(pass, alert.HandleError("group", "delete"));
        }
    }
})();
