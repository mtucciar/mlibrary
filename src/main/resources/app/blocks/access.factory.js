/**
 * Created by mtucciarone on 18/12/2015.
 * @namespace Factories
 */
(function() {
    'use strict';

    access.$inject = ['$http', 'router', 'tools', 'alert'];
    angular.module('blocks.access')
           .factory('access', access);

    /* @ngInject */
    /**
     * @namespace access
     * @memberOf Factories
     * @param $http
     * @param router
     * @param tools
     * @param alert
     * @returns {{accessToken: null, user: null, isLoggedIn: boolean, isAdmin: boolean, getGroups: getGroups, Login: login, logout: logout, getAccessToken: *, getUser: *, GetUserName: getUserName, GetUserFullName: getUserFullName, getAdmin: *}}
     */
    function access($http, router, tools, alert) {
        var sdo = {
            accessToken: null,
            user: null,
            isLoggedIn: false,
            isAdmin: false,

            login: login,
            logout: logout,
            getAccessToken: getterBuilder("accessToken"),
            getUser: getterBuilder("user"),
            GetUserName: getUserName,
            GetUserFullName: getUserFullName,
            getAdmin: getterBuilder("isAdmin")
        };

        return sdo;

        //////////////////

        function login() {
            sdo.accessToken = {};
            sdo.isLoggedIn = true;
        }

        /**
         * @memberOf Factories.access
         */
        function logout() {
            sdo.accessToken = null;
            sdo.isLoggedIn = false;
            router.go("signup");
        }

        /**
         * @memberOf Factories.access
         * @param attrName
         * @returns {Function}
         */
        function getterBuilder(attrName) {
            return function() {
                return sdo[attrName];
            };
        }

        /**
         * @memberOf Factories.access
         * @returns {*}
         */
        function getUserName() {
            if (sdo.user)
                return sdo.user.name;
        }

        /**
         * @memberOf Factories.access
         * @returns {*}
         */
        function getUserFullName() {
            if (sdo.user) {
                if (sdo.user.displayName !== "" && sdo.user.displayName !== null)
                    return sdo.user.displayName;
                else
                    return sdo.user.name;
            }
        }
    }
})();

