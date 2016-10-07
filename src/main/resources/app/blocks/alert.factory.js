/**
 * Created by mtucciarone on 18/12/2014.
 * Alert Factory
 */
(function() {
    'use strict';

    alert.$inject = ['$q', '$log', '$timeout', 'config'];
    angular.module('blocks.alert')
           .factory('alert', alert);

    /* @ngInject */
    /**
     * @namespace alert
     * @description This is the alert service
     * @memberOf Factories
     * @param $q
     * @param $log
     * @param $timeout
     * @param config
     */
    function alert($q, $log, $timeout, config) {
        var idCnt = 1;
        var sdo = {
            alerts: [],
            SuccessWriter: successWriter,
            ErrorWriter: errorWriter,
            ErrorWriterNoCallback: errorWriterNoCallback,
            ErrorWriterModal: errorWriterModal,
            HandleError: handleError,
            RemoveAlert: removeAlert,
            AddAlert: addAlert,
            WarningWriterNoCallback: warningWriterNoCallback,
            codes: {
                "401": {
                    "message": "You have not gained authorization to make this request",
                    "api": {
                        "token": {
                            "message": "Incorrect username and/or password",
                            "method": {}
                        },
                        "user": {
                            "message": "You have not gained authorization",
                            "method": {
                                "get": "You have not gained authorization to view the list of users",
                                "post": "You have not gained authorization to create a new user or reset their password",
                                "put": "You have not gained authorization to update this user"
                            }
                        },
                        "raq": {
                            "message": "You have not gained authorization",
                            "method": {}
                        }
                    }
                },
                "400": {
                    "message": "There is a problem with the request",
                    "api": {
                        "job": {
                            "message": "Could not get specified Job",
                            "method": {}
                        },
                        "recipethreshold": {
                            "message": "Operation could not be completed",
                            "method": {}
                        },
                        "recipetext": {
                            "message": "Operation could not be completed",
                            "method": {
                                "post": "You have not supplied any identifiers"
                            }
                        },
                        "risk": {
                            "message": "Operation could not be completed",
                            "method": {}
                        },
                        "threshold": {
                            "message": "Operation could not be completed",
                            "method": {}
                        },
                        "raq": {
                            "message": "Operation could not be completed",
                            "method": {
                                "put": "The specified Risk Assessment is incomplete or is corrupted",
                                "post": "The specified Risk Assessment is incomplete or is corrupted"
                            }
                        }
                    }
                },
                "403": {
                    "message": "You do not have permission for that",
                    "api": {
                        "content": {
                            "message": "You do not have permission to access the requested resource(s)",
                            "method": {}
                        },
                        "job": {
                            "message": "You do not have permission to access the specified Job",
                            "method": {}
                        },
                        "project": {
                            "message": "You do not have permission to access the specified Project",
                            "method": {
                                "post": "You do not have permission to create Projects",
                                "put": "You do not have permission to update the Project",
                                "delete": "You do not have permission to delete the Project"
                            }
                        },
                        "raq": {
                            "message": "You do not have permission to access the specified Risk Assessment",
                            "method": {
                                "get": "You do not have permission to access the specified Risk Assessment",
                                "post": "You do not have permission to add the specified Risk Assessment",
                                "put": "You do not have permission to update the specified Risk Assessment",
                                "delete": "You do not have permission to delete the specified Risk Assessment"
                            }
                        },
                        "recipe": {
                            "message": "You do not have permission to access the specified Recipe",
                            "method": {}
                        },
                        "user": {
                            "message": "You do not have permission to access the specified User",
                            "method": {}
                        }
                    }
                },
                "404": {
                    "message": "The resource could not be found",
                    "api": {
                        "content": {
                            "message": "Resource and/or resources in request could not be found",
                            "method": {}
                        },
                        "job": {
                            "message": "Job could not be found",
                            "method": {}
                        },
                        "project": {
                            "message": "Project could not be found",
                            "method": {}
                        },
                        "raq": {
                            "message": "Risk Assessment could not be found",
                            "method": {}
                        },
                        "recipe": {
                            "message": "Recipe could not be found",
                            "method": {}
                        },
                        "semantic": {
                            "message": "Semantic Type could not be found",
                            "method": {}
                        },
                        "user": {
                            "message": "User could not be found",
                            "method": {}
                        }
                    }
                },
                "406": {
                    "message": "The requested resource cannot generate an acceptable content type",
                    "api": {}
                },
                "409": {
                    "message": "There is a conflict with the requested resource",
                    "api": {
                        "job": {
                            "message": "There is a conflict with the requested Job",
                            "method": {}
                        },
                        "project": {
                            "message": "There is a conflict with the requested Project",
                            "method": {}
                        },
                        "raq": {
                            "message": "There is a conflict with the requested Risk Assessment",
                            "method": {}
                        },
                        "recipe": {
                            "message": "There is a conflict with the requested Recipe",
                            "method": {}
                        }
                    }
                },
                "500": {
                    "message": "Internal Service Error",
                    "api": {}
                }
            },
            modulePrefix: {
                'app.layout': 'LO',
                'app.add': 'ADD',
                'app.edit': 'ED',
                'app.listen': 'LS',
                'app.status': 'ST'
            }
        };

        return sdo;
        //////////////////

        //timeout will default to 20secs if undefined or not a number.
        /**
         * @memberOf Factories.alert
         * @param alertType
         * @param message
         * @param details
         * @param timeout
         * @returns {number}
         */
        function addAlert(alertType, message, details, timeout) {
            //accepted types are: success,info,warning,danger
            //reset idCnt if the alert size is 0;
            if (sdo.alerts.length > 0) {
                idCnt++;
            }
            else {
                idCnt = 1;
            }

            sdo.alerts.push({
                'id': idCnt,
                'type': alertType,
                'msg': message,
                'detailedMsg': details,
                'expanded': false
            });
            timeoutAlert(idCnt, timeout, alertType);
            return idCnt;
        }

        //Remove the alert message with id after x secs depending on type.
        /**
         * @memberOf Factories.alert
         * @param id
         * @param timeout
         * @param alertType
         */
        function timeoutAlert(id, timeout, alertType) {
            if (timeout === undefined || (typeof timeout !== "number")) {
                timeout = (alertType === "alert" || alertType === "warning") ? 90000 : 1500;
            }
            $timeout(function() {
                removeAlert(id);
            }, timeout);
            //setTimeout(function(){sdo.removeAlert(id)},timeout);
        }

        /**
         * @memberOf Factories.alert
         * @param id
         */
        function removeAlert(id) {
            for (var index = 0; index < sdo.alerts.length; index++) {
                if (sdo.alerts[index].id === id) {
                    sdo.alerts.splice(index, 1);
                    break;
                }
            }
        }

        //altApiMessage is one of : {"project", "semantic", "content", "job", "recipe", "raq", "user", "risk", "threshold", ...}
        /**
         * @memberOf Factories.alert
         * @param code
         * @param api
         * @param method
         * @returns {string}
         */
        function processMessage(code, api, method) {
            var uiMessage = code + " ";
            if (code in sdo.codes) {
                if (api && api in sdo.codes[code].api) {
                    if (method && method in sdo.codes[code].api[api].method) {
                        $log.info(sdo.codes[code].api[api].method[method]);
                        uiMessage += sdo.codes[code].api[api].method[method];
                    }
                    else {
                        $log.info(sdo.codes[code].api[api].message);
                        uiMessage += sdo.codes[code].api[api].message;
                    }
                }
                else {
                    $log.info(sdo.codes[code].message);
                    uiMessage += sdo.codes[code].message;
                }
            }
            //default to 500, if no code provided
            else {
                $log.info(sdo.codes[500].message);
                uiMessage += sdo.codes[500].message;
            }

            return uiMessage;
        }

        /**
         * @memberOf Factories.alert
         * @param api
         * @param method
         * @returns {Function}
         */
        function handleError(api, method) {
            return function(data) {
                try {
                    $log.info("Processing error message for API (" + api + ", " + method + "): " + data.data.code);
                    data.data.uiMessage = processMessage(data.data.code, api, method);
                }
                catch (e) {
                    return $q.reject(data);
                }
                return $q.reject(data);
            };
        }

        /**
         * @memberOf Factories.alert
         * @param msg
         */
        function successWriter(msg) {
            addAlert('success', "Saved");
            // addAlert('success', "Successfully " + msg);
        }

        /**
         * @memberOf Factories.alert
         * @param module
         * @param num
         * @param msg
         * @returns {Function}
         */
        function errorWriter(module, num, msg) {
            return function(data) {
                try {
                    $log.info(msg);
                    $log.info(data);
                    $log.info(data.data);
                    addAlert('alert', config.appErrorPrefix + sdo.modulePrefix[module] + num + " - " + msg + ": " + data.data.uiMessage, data.data.errorMessage, data);
                }
                catch (e) {
                    addAlert('alert', config.appErrorPrefix + num + " - Cannot contact server: Server is unreachable or is offline");
                }
            };
        }

        /**
         * @memberOf Factories.alert
         * @param module
         * @param num
         * @param msg
         * @param data
         */
        function errorWriterNoCallback(module, num, msg, data) {
            if (data)
                if (data.data.uiMessage)
                    addAlert('alert', config.appErrorPrefix + sdo.modulePrefix[module] + num + " - " + msg + ": " + data.data.uiMessage, data.data.errorMessage, data);
                else
                    addAlert('alert', config.appErrorPrefix + sdo.modulePrefix[module] + num + " - " + msg, data.data.errorMessage, data);
            else
                addAlert('alert', config.appErrorPrefix + sdo.modulePrefix[module] + num + " - " + msg);
        }

        /**
         * @memberOf Factories.alert
         * @param msg
         * @param data
         */
        function warningWriterNoCallback(msg, data) {
            if (data)
                if (data.data.uiMessage)
                    addAlert('warning', "Warning - " + msg + ": " + data.data.uiMessage, data.data.errorMessage, data);
                else
                    addAlert('warning', "Warning - " + msg, data.data.errorMessage, data);
            else
                addAlert('warning', "Warning - " + msg);
        }

        /**
         * @memberOf Factories.alert
         * @param data
         * @param module
         * @param num
         * @param msg
         * @returns {{msg: string, detailedMsg: string}}
         */
        function errorWriterModal(data, module, num, msg) {
            $log.info(msg);
            $log.info(data);
            $log.info(data.data);

            return {
                "msg": config.appErrorPrefix + sdo.modulePrefix[module] + num + " - " + msg + ": " + data.data.uiMessage,
                "detailedMsg": data.data.errorMessage
            };
        }
    }
})();