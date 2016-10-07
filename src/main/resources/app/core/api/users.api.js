/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    usersAPI.$inject = ['$http', 'tools', 'alert'];
    angular.module('app.core')
           .factory('usersAPI', usersAPI);

    /* @ngInject */
    /**
     * @namespace usersAPI
     * @memberOf API
     * @param $http
     * @param tools
     * @param alert
     * @returns {{GetUser: getUser, GetUsers: getUser, AddUser: addUser, EditUser: editUser, DeleteUser: deleteUser, UpdatePassword: updatePassword, RequestResetPassword: requestResetPassword, ResetPassword: resetPassword}}
     */
    function usersAPI($http, tools, alert) {
        var service = {
            GetUser: getUser,
            GetUsers: getUser,
            AddUser: addUser,
            EditUser: editUser,
            DeleteUser: deleteUser,
            UpdatePassword: updatePassword,
            RequestResetPassword: requestResetPassword,
            ResetPassword: resetPassword
        };
        var baseURL = '/api/1.0/users/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf API.usersAPI
         * @param userName
         * @returns {*}
         */
        function getUser(userName) {
            return $http({
                method: 'GET',
                url: baseURL + (userName ? userName : '')
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("user", "get"));
        }

        /**
         * @memberOf API.usersAPI
         * @param userObject
         * @returns {*}
         */
        function addUser(userObject) {
            return $http.post(baseURL, userObject, {responseType: "json"})
                        .then(function(data) {
                            tools.log.info(data);
                            return data.data;
                        }, alert.HandleError("user", "post"));
        }

        /**
         * @memberOf API.usersAPI
         * @param userObject
         * @returns {*}
         */
        function editUser(userObject) {
            return $http.put(baseURL + userObject.id, userObject, {responseType: "json"})
                        .then(function(data) {
                            return data.data;
                        }, alert.HandleError("user", "put"));
        }

        function deleteUser(userID) {
            return $http.delete(baseURL + userID)
                        .then(function(data) {
                            return data.data;
                        }, alert.HandleError("user", "delete"));
        }

        /**
         * @memberOf API.usersAPI
         * @param userID
         * @param newPassword
         * @returns {*}
         */
        function updatePassword(userID, newPassword) {
            return $http({
                method: 'POST',
                url: baseURL + userID + '/password',
                data: JSON.stringify(newPassword)
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("user", "put"));
        }

        /**
         * @memberOf API.usersAPI
         * @param userID
         * @returns {*}
         */
        function requestResetPassword(userID) {
            return $http({
                method: 'GET',
                url: baseURL + userID + '/reset'
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("user", "get"));
        }

        /**
         * @memberOf API.usersAPI
         * @param userID
         * @param secret
         * @param newPasswordObject
         * @returns {*}
         */
        function resetPassword(userID, secret, newPasswordObject) {
            return $http({
                method: 'POST',
                url: baseURL + userID + '/password',
                ignoreAuthModule: true,
                headers: {
                    'Authorization': "Bearer " + secret
                },
                data: JSON.stringify(newPasswordObject)

            })
                .then(function(data, status) {
                }, alert.HandleError("user", "put"));
        }
    }
})();
