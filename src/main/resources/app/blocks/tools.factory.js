/**
 * Created by mtucciarone on 26/10/2015.
 */
(function() {
    'use strict';

    tools.$inject = ['$log', '$timeout', '$window', '$interval', '$location', '$cookies', '$modal', '$filter', '$q'];
    angular.module('blocks.tools')
           .factory('tools', tools);

    /* @ngInject */
    /**
     * @namespace tools
     * @memberOf Factories
     * @param $log
     * @param $timeout
     * @param $window
     * @param $interval
     * @param $location
     * @param $cookies
     * @param $modal
     * @param $filter
     * @param $q
     * @returns {{timeout: *, log: *, cookies: *, q: *, modal: *, filter: *, interval: *, location: *, window: *, InArray: inArray, ExtractElement: extractElement, RemoveElement: removeElement, Subset: subset, GetPage: getPage, Exists: exists, ContainsAnyOf: containsAnyOf, CapitalizeString: capitalizeString, IsEmptyObject: isEmptyObject}}
     */
    function tools($log, $timeout, $window, $interval, $location, $cookies, $modal, $filter, $q) {
        var sdo = {
            // Angular services
            timeout: $timeout,
            log: $log,
            cookies: $cookies,
            q: $q,
            modal: $modal,
            filter: $filter,
            interval: $interval,
            location: $location,
            window: $window,
            // Custom functions
            InArray: inArray,
            ExtractElement: extractElement,
            RemoveElement: removeElement,
            Subset: subset,
            GetPage: getPage,
            Exists: exists,
            ContainsAnyOf: containsAnyOf,
            CapitalizeString: capitalizeString,
            IsEmptyObject: isEmptyObject
        };

        return sdo;
        //////////////////

        /**
         * @memberOf Factories.tools
         * @param needle
         * @param haystack
         * @returns {boolean}
         */
        function inArray(needle, haystack) {
            return (haystack.filter(
                function(element) {
                    return element === needle;
                }
            ).length > 0);
        }

        /**
         * @memberOf Factories.tools
         * @param array
         * @param property
         * @param value
         * @returns {*}
         */
        function extractElement(array, property, value) {
            for (var i = 0; i < array.length; i++) {
                var elem = array[i];
                if (elem[property] === value) {
                    return elem;
                }
            }
            return null;
        }

        /**
         * @memberOf Factories.tools
         * @param array
         * @param elementIndex
         * @returns {*}
         */
        function removeElement(array, elementIndex) {
            if (elementIndex >= 0)
                array.splice(elementIndex, 1);
            return array;
        }

        /**
         * @memberOf Factories.tools
         * @param array
         * @param start
         * @param length
         * @returns {ArrayBuffer|*|Buffer|Array.<T>|Blob|string}
         */
        function subset(array, start, length) {
            return array.slice(start, start + length);
        }

        /**
         * @memberOf Factories.tools
         * @param array
         * @param pageSize
         * @param pageNum
         * @returns {ArrayBuffer|*|Buffer|Array.<T>|Blob|string}
         */
        function getPage(array, pageSize, pageNum) {
            return subset(array, pageSize * (pageNum - 1), pageSize);
        }

        /**
         * @memberOf Factories.tools
         * @param element
         * @returns {boolean}
         */
        function exists(element) {
            return (angular.isDefined(element) && element !== null && element !== "");
        }

        /**
         * @memberOf Factories.tools
         * @param str
         * @param symbols
         * @returns {boolean|*}
         */
        function containsAnyOf(str, symbols) {
            // determine whether `str` contains any of the symbols in the array `symbols`
            return symbols.some(function(s) {
                return str.indexOf(s) > -1;
            });
        }

        /**
         * @memberOf Factories.tools
         * @param str
         * @returns {string}
         */
        function capitalizeString(str) {
            return str.charAt(0)
                      .toUpperCase() + str.slice(1);
        }

        /**
         * @memberOf Factories.tools
         * @param theObj
         * @returns {boolean}
         */
        function isEmptyObject(theObj) {
            for (var key in theObj) {
                if (theObj.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }
    }
})();