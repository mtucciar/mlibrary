/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    configAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('configAPI', configAPI);

    /* @ngInject */
    /**
     * @namespace configAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetRootPaths: getRootPaths, GetJDBCDrivers: getDriverProperties, GetDriverProperties: getDriverProperties, GetCatalogs: getCatalogModel, GetCatalogModel: getCatalogModel, GetLexiconDateFormats: *, GetRiskDateFormats: *, GetRiskTimeFormats: *}}
     */
    function configAPI($http, alert) {
        var service = {
            GetRootPaths: getRootPaths,
            GetJDBCDrivers: getDriverProperties,
            GetDriverProperties: getDriverProperties,
            GetCatalogs: getCatalogModel,
            GetCatalogModel: getCatalogModel,
            GetLexiconDateFormats: getFormatsBuilder('text', 'date'),
            GetRiskDateFormats: getFormatsBuilder('riskmeasurement', 'date'),
            GetRiskTimeFormats: getFormatsBuilder('riskmeasurement', 'time')
        };
        var baseURL = '/api/1.0/config/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.configAPI
         * @param data
         * @returns {data.data|{uiMessage, errorMessage}|{code}}
         */
        function pass(data) {
            return data.data;
        }

        /**
         * @memberOf APIs.configAPI
         * @returns {*}
         */
        function getRootPaths() {
            return $http({
                method: 'GET',
                url: baseURL + 'projects',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(pass, alert.HandleError("config", "get"));
        }

        /**
         * @memberOf APIs.configAPI
         * @param driver
         * @returns {*}
         */
        function getDriverProperties(driver) {
            return $http({
                method: 'GET',
                url: baseURL + 'jdbc/' + (driver ? driver + '/properties' : '')
            })
                .then(pass, alert.HandleError("jdbc", "get"));
        }

        /**
         * @memberOf APIs.configAPI
         * @param driver
         * @param driverInfo
         * @param catalog
         * @returns {*}
         */
        function getCatalogModel(driver, driverInfo, catalog) {
            return $http({
                method: 'POST',
                url: baseURL + 'jdbc/' + driver + '/catalogs' + (catalog ? '/' + catalog : ''),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(driverInfo)
            })
                .then(pass, alert.HandleError("jdbc", "post"));
        }

        /**
         * @memberOf APIs.configAPI
         * @param type
         * @param operation
         * @returns {Function}
         */
        function getFormatsBuilder(type, operation) {
            return function() {
                // instead of making two separate calls for default and non-default lists, we have one call;
                // the returned JSON will have a boolean "default" property on each date format.
                return $http({
                    method: 'GET',
                    url: baseURL + type + '/' + operation + 'formats',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(pass, alert.HandleError(type, "get"));
            };
        }
    }
})();
