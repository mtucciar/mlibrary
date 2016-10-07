(function() {
    'use strict';
    angular.module('app', [
        // Custom modules that everybody has access to
        'app.core',
        'app.layout',
        'app.filters',
        'app.directives',

        // Feature areas
        'app.status',
        'app.add',
        'app.edit',
        'app.listen'
    ]);

    angular.element(document)
           .ready(function() {
               angular.bootstrap(document, ["app"]);
           });
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.add', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('blocks.access', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('blocks.alert', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('blocks.exception', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('blocks.idler', []);
})();
/**
 * Created by mtucciarone on 12/01/2016.
 */
(function() {
    'use strict';
    angular.module('blocks.inputValidation', []);
})();
/**
 * Created by mtucciarone on 05/04/2016.
 */
(function() {
    'use strict';
    angular.module('blocks.jsonStorage', []);
})();
/**
 * Created by mtucciarone on 22/12/2015.
 */
(function() {
    'use strict';
    angular.module('blocks.router', ['ui.router']);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('blocks.tools', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 * @namespace Controllers
 */
(function() {
    'use strict';
    angular.module('app.core', [
        // Angular modules
        'ngAnimate',
        'ngCookies',
        'ngSanitize',

        // Custom modules
        'blocks.alert', 'blocks.access', 'blocks.exception', 'blocks.idler',
        'blocks.jsonStorage', 'blocks.tools', 'blocks.router',
        'blocks.inputValidation',

        // 3rd Party modules
        'ui.router',
        'ngIdle',
        'mm.foundation',
        'http-auth-interceptor',
        'valdr',
        'smart-table'
    ]);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.edit', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.filters', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.layout', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.listen', []);
})();
/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.status', []);
})();
/**
 * Created by mtucciarone on 24/06/2015.
 */
(function() {
    Add.$inject = ['tools', 'alert', 'router', 'currentProject'];
    angular.module('app.add')
           .controller('Add', Add);

    /* @ngInject */
    function Add(tools, alert, router, currentProject) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.add";

        vm.HasLoaded = false;

        loadPage();

        //////////////////

        function loadPage() {
            if (currentProject) {
                vm.HasLoaded = true;
                tools.log.info('going to wizard');
                router.go('add.wizard');
            }
            else {
                alert.ErrorWriterNoCallback('app.add', '22', 'Error getting project');
                router.go("status");
            }
        }
    }
})();
/**
 * Created by mtucciarone on 24/06/2015.
 */
(function() {
    LibraryWizard.$inject = ['tools', 'configAPI', 'jsonStorage', 'alert', 'router'];
    angular.module('app.add')
           .controller('LibraryWizard', LibraryWizard);

    /* @ngInject */
    function LibraryWizard(tools, configAPI, jsonStorage, alert, router) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.add";

        vm.navigationItems = jsonStorage.getItem("add.wizard", "navigationItems");
    }
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.add')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'add.wizard',
                config: {
                    templateUrl: 'add/add.wizard.html',
                    controller: 'LibraryWizard',
                    controllerAs: 'vm',
                    title: 'Library Setup'
                }
            }
        ];
    }
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.add')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        /* @ngInject */
        getCurrentProject.$inject = ['jsonStorage', 'router', 'alert', 'tools'];
        function getCurrentProject(jsonStorage, router, alert, tools) {
            var currentProjectName = tools.cookies.get("currentProjectName");
            if (!angular.isDefined(currentProjectName)) {
                alert.ErrorWriterNoCallback('app.add', '99', 'Project is not loaded');
                router.resetRoutes();
                router.go("status");
                return;
            }
            return jsonStorage.GetProjectByName(currentProjectName);
        }

        return [
            {
                name: 'add',
                config: {
                    url: '/add',
                    templateUrl: 'add/add.html',
                    controller: 'Add',
                    controllerAs: 'vm',
                    title: 'Add',
                    helpPage: 'Add',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-plus fa-lg pad-right-2 pad-top"></i><b>Add</b>',
                        enabled: false
                    },
                    resolve: {
                        currentProject: getCurrentProject
                    }
                }
            }
        ];
    }
})();
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


/**
 * Created by gbradley on 18/12/2014.
 */
(function() {
    'use strict';

    Alert.$inject = ['alert'];
    angular.module('blocks.alert')
           .controller('Alert', Alert);

    /* @ngInject */
    /**
     * @namespace Alert
     * @memberOf Controllers
     * @param alert
     * @constructor
     */
    function Alert(alert) {
        var vm = this;

        vm.alerts = alert.alerts;
        vm.Expand = setState(true);
        vm.Collapse = setState(false);
        vm.CloseAlert = alert.RemoveAlert;

        /**
         * @memberOf Controllers.Alert
         * @param state
         * @returns {Function}
         */
        function setState(state) {
            return function(alert) {
                alert.expanded = state;
            };
        }
    }
})();
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
/**
 * Created by mtucciarone on 01/09/2015.
 */
(function() {
    'use strict';

    exceptionHandler.$inject = ['$injector'];
    angular.module('blocks.exception')
           .factory('$exceptionHandler', exceptionHandler);

    /* @ngInject */
    /**
     * @namespace exceptionHandler
     * @memberOf Factories
     * @param $injector
     * @returns {Function}
     */
    function exceptionHandler($injector) {
        return function(exception, cause) {
            var alert = $injector.get("alert");
            alert.AddAlert('alert', "EC.IJS - Internal Javascript error. Please do one of the following: 1) Install a newer version of your browser. 2) Re-login and attempt the process again. 3) Contact Customer Support", exception.stack + ": " + exception.message + ' (caused by "' + cause + '")', 90000);
        };
    }
})();

/**
 * Created by mtucciarone on 23/09/2015.
 */
(function() {
    'use strict';

    Idler.$inject = ['$scope', 'Idle', 'access', '$modal'];
    angular.module('blocks.idler')
           .controller('Idler', Idler);

    /* @ngInject */
    /**
     * @namespace Idler
     * @memberOf Controllers
     * @param $scope
     * @param Idle
     * @param access
     * @param $modal
     * @constructor
     */
    function Idler($scope, Idle, access, $modal) {
        $scope.started = false;

        $scope.$on('IdleStart', showWarning);
        $scope.$on('IdleEnd', closeModals);
        $scope.$on('IdleTimeout', boot);

        /**
         * @memberOf Controllers.Idler
         */
        function closeModals() {
            if ($scope.warning) {
                $scope.warning.close();
                $scope.warning = null;
            }

            if ($scope.timedout) {
                $scope.timedout.close();
                $scope.timedout = null;
            }
        }

        /**
         * @memberOf Controllers.Idler
         */
        function showWarning() {
            closeModals();

            $scope.warning = $modal.open({
                templateUrl: 'warning-dialog.html',
                windowClass: 'modal-danger'
            });
        }

        /**
         * @memberOf Controllers.Idler
         */
        function boot() {
            closeModals();
            access.logout();
        }

    }
})();
/**
 * Created by mtucciarone on 12/01/2016.
 */
(function() {
    'use strict';

    badSymbols.$inject = ['tools'];
    angular.module('blocks.inputValidation')
           .provider('validationConfig', validationConfig);

    angular.module('blocks.inputValidation')
           .factory('badSymbols', badSymbols)
           .factory('onlyNumbers', onlyNumbers)
           .factory('prevalencePercentage', prevalencePercentage);

    /* @ngInject */
    /**
     * @namespace validationConfig
     * @memberOf Factories
     */
    function validationConfig() {
        /* jshint validthis:true */
        this.constraints = {
            'EmailForm': {
              'email': {
                  'required': {
                      message: 'This is an error message'
                  }
              }
            },
            'Group': {
                'groupName': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Group name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Group name is required.'
                    }
                }
            },
            'User': {
                'userName': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Username must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Username is required.'
                    },
                    'badSymbols': {
                        'symbols': [":"],
                        'message': "Username cannot contain a colon"
                    }
                },
                'displayName': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Display name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Display name is required.'
                    }
                },
                'emailAddress': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Email address must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Email address is required.'
                    },
                    email: {
                        "message": "Must be a valid email address."
                    }
                },
                'password': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                },
                'verifyPassword': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                }
            },
            'Library': {
                'projectName': {
                    'badSymbols': {
                        'symbols': ["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"],
                        'message': 'Library Name cannot contain any of the following characters:' + '["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"]'
                    },
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Library name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Library name is required.'
                    }
                }
            },
            'DataDetails': {
                'population': {
                    'min': {
                        'value': 1,
                        'message': "Population must be larger than 1"
                    },
                    'max': {
                        'value': 7500000000,
                        'message': "Population is too large"
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Population must be a whole number'
                    },
                    'required': {
                        'message': 'Custom population is required.'
                    }
                },
                't2Population': {
                    'min': {
                        'value': 1,
                        'message': "Population must be larger than 1"
                    },
                    'max': {
                        'value': 7500000000,
                        'message': "Population is too large"
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Population must be a whole number'
                    }
                },
                'percentage': {
                    'max': {
                        'value': 100,
                        'message': 'Must be less than or equal to 100'
                    },
                    'prevalencePercentage': {
                        'message': "Must be greater than 0.000001"
                    }
                }
            },
            'Network': {
                'sourceNetworkSuffix': {
                    'badSymbols': {
                        'symbols': [':'],
                        'message': 'Colon is not allowed here'
                    }
                },
                'targetNetworkSuffix': {
                    'size': {
                        'min': 0,
                        'message': 'Folder path is required'
                    },
                    'required': {
                        'message': 'Folder path is required.'
                    },
                    'badSymbols': {
                        'symbols': [':'],
                        'message': 'Colon is not allowed here'
                    }
                }
            },
            'Destination': {
                'targetNetworkSuffix': {
                    'badSymbols': {
                        'symbols': [':'],
                        'message': 'Colon is not allowed here'
                    }
                }
            },
            'Database': {
                'password': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                }
            },
            'ChangeDatabase': {
                'password': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                },
                'confirmPassword': {
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Password must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Password is required.'
                    }
                }
            },
            'DateFormat': {
                'date': {
                    'required': {
                        'message': 'Date format is required.'
                    }
                }
            },
            'DataGroup': {
                'groupName': {
                    'badSymbols': {
                        'symbols': ["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"],
                        'message': 'Library Name cannot contain any of the following characters:' + '["\\", "/", ":", "*", "?", "\"", "<", ">", "{", "}", "[", "]", ",", "^", "|"]'
                    },
                    'size': {
                        'min': 0,
                        'max': 64,
                        'message': 'Library name must be less than 65 characters.'
                    },
                    'required': {
                        'message': 'Library name is required.'
                    }
                }
            },
            'Generalization': {
                'length': {
                    'min': {
                        'value': 1,
                        'message': "No negative value is allowed."
                    },
                    'required': {
                        'message': 'Length is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'subStrStart': {
                    'min': {
                        'value': 1,
                        'message': "Must start at first character or later"
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'start': {
                    'max': {
                        'value': 99999999999999999,
                        'message': "This is too large."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'interval': {
                    'min': {
                        'value': 1,
                        'message': "Must be greater than 0"
                    },
                    'required': {
                        'message': 'Interval is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'startDouble': {
                    'max': {
                        'value': 99999999999999999,
                        'message': "This is too large."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    }
                },
                'intervalDouble': {
                    'min': {
                        'value': 0.000000000000000001,
                        'message': "Must be greater than 0"
                    },
                    'required': {
                        'message': 'Interval is required.'
                    }
                },
                'startingYear': {
                    'minLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'maxLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    },
                    'onlyNumbers': {
                        'message': 'Must be a whole number'
                    }
                },
                'topCodeValue': {
                    'minLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'maxLength': {
                        'number': 4,
                        'message': "The year must be four digits."
                    },
                    'required': {
                        'message': 'Starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    },
                    'onlyNumbers': {
                        'message': 'Must be a whole number'
                    }
                }
            },
            'DateShifting': {
                'shiftStart': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting starting value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting starting value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'shiftEnd': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting ending value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting ending value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting ending value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'jitter': {
                    'min': {
                        'value': 1,
                        'message': "Jitter Dates value must be greater than 0 to jitter date interval"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Jitter starting value must be smaller"
                    },
                    'required': {
                        'message': 'Jitter starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'timeShiftStart': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting-time starting value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting-time starting value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting-time starting value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                },
                'timeShiftEnd': {
                    'min': {
                        'value': -9999999999,
                        'message': "Shifting-time ending value must be larger"
                    },
                    'max': {
                        'value': 9999999999,
                        'message': "Shifting-time ending value must be smaller"
                    },
                    'required': {
                        'message': 'Shifting-time ending value is required.'
                    },
                    'badSymbols': {
                        'symbols': ['.'],
                        'message': 'Must be a whole number'
                    }
                }
            }
        };

        this.$get = function() {
            return {
                constraints: this.constraints
            };
        };
    }

    /* @ngInject */
    /**
     * @namespace badSymbols
     * @memberOf Factories
     */
    function badSymbols(tools) {
        return {
            name: 'badSymbols',
            validate: function(value, args) {
                if (value) {
                    return !tools.ContainsAnyOf(value.toString(), args.symbols);
                }
                return true;
            }
        };
    }

    /* @ngInject */
    /**
     * @namespace onlyNumbers
     * @memberOf Factories
     */
    function onlyNumbers() {
        return {
            name: 'onlyNumbers',
            validate: function(value) {
                if (value) {
                    return !isNaN(value);
                }
                return true;
            }
        };
    }

    /* @ngInject */
    /**
     * @namespace prevalencePercentage
     * @memberOf Factories
     */
    function prevalencePercentage() {
        return {
            name: 'prevalencePercentage',
            validate: function(value, args) {
                if (value) {
                    return (value >= 0.000001 && value <= 100);
                }
                return false;
            }
        };
    }

})();
/**
 * Created by mtucciarone on 05/04/2016.
 */
(function() {
    'use strict';

    jsonStorage.$inject = ['$state', 'tools', 'access', 'router'];
    angular.module('blocks.jsonStorage')
           .factory('jsonStorage', jsonStorage);

    /* @ngInject */
    /**
     * @namespace jsonStorage
     * @memberOf Factories
     * @param $state
     * @param tools
     * @param access
     * @param router
     * @returns {{getItem: getItem}}
     */
    function jsonStorage($state, tools, access, router) {
        var sdo = {
            getItem: getItem,
            CreateProject: createProject,
            DeleteProject: deleteProject,
            GetProjects: getProjects,
            GetProjectByName: getProjectByName
        };

        var localStorage = {
            "layout.menu": {
                "GeneralNav": [
                    {
                        Title: "Profile",
                        MenuLink: function() {
                            $state.go('profile', {}, {reload: true});
                        },
                        Visibility: true,
                        Icon: "fa fa-user"
                    },
                    {Visibility: true, Title: 'divider'},
                    {
                        Title: "About",
                        MenuLink: function() {
                            tools.modal.open({
                                templateUrl: 'layout/about/about.html',
                                controller: 'About',
                                controllerAs: 'vm'
                            });
                        },
                        Visibility: true,
                        Icon: "fa fa-font"
                    }, {
                        Title: "Logout",
                        MenuLink: access.logout,
                        Visibility: true,
                        Icon: "fa fa-sign-out"
                    }
                ]
            },
            "add.wizard": {
                "navigationItems": [
                    {
                        Title: 'Upload Local',
                        id: 'upload',
                        MenuLink: function() {
                            router.go('edit');
                        },
                        Image: "content/images/upload_icon.png",
                        Color: "success",
                        Visible: true
                    }, {
                        Title: 'Folder Files',
                        id: 'network',
                        MenuLink: function() {
                            router.go('edit');
                        },
                        Image: "content/images/network_folder.png",
                        Color: "info",
                        Visible: true
                    }
                ]
            }
        };

        var projects = [
            {
                id: "1",
                name: "Foobar Files",
                files: [
                    {
                        name: "Calm Snow",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "191"
                    },
                    {
                        name: "Break",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "227"
                    },
                    {
                        name: "White Lies",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "212"
                    },
                    {
                        name: "Everyone's Safe",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "246"
                    },
                    {
                        name: "Running With Scissors",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "262"
                    },
                    {
                        name: "Mobbin' Out",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "295"
                    },
                    {
                        name: "Walking on Gravetones",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "230"
                    },
                    {
                        name: "Light in the Cave",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "231"
                    },
                    {
                        name: "All In",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "262"
                    },
                    {
                        name: "Two Hearted",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "264"
                    },
                    {
                        name: "Portals",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "323"
                    },
                    {
                        name: "Yellow King",
                        artist: "I See Stars",
                        album: "Treehouse",
                        genre: "Electronicore",
                        year: "2016",
                        duration: "289"
                    }
                ],
                created: "2016-06-28T02:35:53.603Z"
            }
        ];

        return sdo;
        //////////////////

        /**
         * @memberOf Factories.jsonStorage
         * @param controllerName
         * @param jsonName
         * @returns {*}
         */
        function getItem(controllerName, jsonName) {
            return angular.copy(localStorage[controllerName][jsonName]);
        }

        function createProject(project) {
            projects.push(project);
        }

        function deleteProject(projectIndex) {
            projects = tools.RemoveElement(projects, projectIndex);
        }

        function getProjects() {
            return projects;
        }

        function getProjectByName(projectName) {
            var projectsFound = projects.filter(function(project) {
                return project.name.toLowerCase() === projectName.toLowerCase();
            });
            if (projectsFound)
                return projectsFound[0];
        }
    }
})();
/**
 * Created by mtucciarone on 22/12/2015.
 * @namespace Providers
 */
(function() {
    'use strict';

    router.$inject = ['$rootScope', '$state', 'routerConfig', 'tools'];
    angular
        .module('blocks.router')
        .provider('routerConfig', routerConfig)
        .factory('router', router);

    // Must configure via the routerConfigProvider
    /**
     * @namespace routerConfig
     * @memberOf Providers
     */
    function routerConfig() {
        /* jshint validthis:true */
        this.config = {};

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    /* @ngInject */
    /**
     * @namespace router
     * @memberOf Factories
     * @param $rootScope
     * @param $state
     * @param routerConfig
     * @param tools
     * @returns {{configureRoutes: configureRoutes, getRoutes: getRoutes, go: go, setRouteStates: setRouteStates, resetRoutes: resetRoutes, toFirstStep: toFirstStep}}
     */
    function router($rootScope, $state, routerConfig, tools) {
        var routes = [];
        var $stateProvider = routerConfig.config.$stateProvider;
        var $urlRouterProvider = routerConfig.config.$urlRouterProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            go: go,
            setRouteStates: setRouteStates,
            getRouteState: getRouteState,
            resetRoutes: resetRoutes,
            toFirstStep: toFirstStep
        };

        load();

        return service;
        //////////////////

        /**
         * @memberOf Factories.router
         * @param routes
         */
        function configureRoutes(routes) {
            routes.forEach(function(route) {
                $stateProvider.state(route.name, route.config);
            });
            $urlRouterProvider.otherwise("/signup");
        }

        /**
         * @memberOf Factories.router
         */
        function load() {
            updateDocTitle();
        }

        /**
         * @memberOf Factories.router
         * @returns {Array}
         */
        function getRoutes() {
            for (var prop in $state.get()) {
                if ($state.get()
                          .hasOwnProperty(prop)) {
                    var route = $state.get()[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        /**
         * @memberOf Factories.router
         * @param routeName
         * @param willJump
         */
        function go(routeName, willJump) {
            var foundRoute = tools.ExtractElement(routes, 'name', routeName.split(".")[0]);
            if (foundRoute && angular.isDefined(foundRoute.settings) && angular.isDefined(foundRoute.settings.enabled)) {
                var sortedRoutes = routes.filter(function(route) {
                    return route.settings;
                })
                                         .sort(function(r1, r2) {
                                             return r1.settings.nav - r2.settings.nav;
                                         })
                                         .filter(function(route) {
                                             return (route.settings.nav <= foundRoute.settings.nav);
                                         })
                                         .map(function(route) {
                                             return route.name;
                                         });
                if (willJump) sortedRoutes = [routeName];
                setRouteStates(sortedRoutes, true);
            }
            tools.log.info("state go");
            $state.go(routeName);
        }

        /**
         * @memberOf Factories.router
         * @param routeNames
         * @param state
         */
        function setRouteStates(routeNames, state) {
            routeNames.forEach(function(route) {
                var foundRoute = tools.ExtractElement(routes, 'name', route.split(".")[0]);
                if (foundRoute)
                    foundRoute.settings.enabled = state;
            });
        }

        /**
         * @memberOf Factories.router
         * @param routeName
         */
        function getRouteState(routeName) {
            var foundRoute = tools.ExtractElement(routes, 'name', routeName.split(".")[0]);
            if (foundRoute)
                return foundRoute.settings.enabled;
            else return false;
        }

        /**
         * @memberOf Factories.router
         */
        function resetRoutes() {
            $state.get()
                  .forEach(function(route) {
                      if (angular.isDefined(route.settings))
                          route.settings.enabled = false;
                  });
        }

        /**
         * @memberOf Factories.router
         */
        function toFirstStep() {
            var step1Route = getRoutes()
                .filter(function(route) {
                    return route.settings;
                })
                .sort(function(a, b) {
                    return a.settings.nav - b.settings.nav;
                })
                .find(function(route) {
                    return route.settings.nav > 2;
                });
            go(step1Route.name);
        }

        /**
         * @memberOf Factories.router
         */
        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, current, previous) {
                    document.querySelector('title').innerHTML = "MLibrary - " + (current.title || '');
                }
            );
        }
    }
})();
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

/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    projectsAPI.$inject = ['$http', '$log', 'alert', 'tools'];
    angular.module('app.core')
           .factory('projectsAPI', projectsAPI);

    /* @ngInject */
    /**
     * @namespace projectsAPI
     * @memberOf APIs
     * @param $http
     * @param $log
     * @param alert
     * @param io
     * @param tools
     * @returns {{GetProjects: getProject, GetProject: getProject, CreateProject: createProject, UpdateProject: updateProject, DeleteProject: deleteProject, CloneProject: cloneProject, ClassifyModel: *, RunIntrospect: *, GetFiles: getFiles, UploadFile: uploadFile, DeleteFile: deleteFile, GetRMRecipe: *, GetLexiconRecipe: *, GetEclipseRecipe: *, CreateRMRecipe: *, CreateLexiconRecipe: *, CreateEclipseRecipe: *, UpdateRMRecipe: *, UpdateLexiconRecipe: *, UpdateEclipseRecipe: *, DeleteLexiconRecipe: *, MeasureRiskAsync: *, ComputeThreshold: computeThreshold, RunMaskAsync: *, RunDeid: *}}
     */
    function projectsAPI($http, $log, alert, tools) {
        var service = {
            GetProjects: getProject,
            GetProject: getProject,
            CreateProject: createProject,
            UpdateProject: updateProject,
            DeleteProject: deleteProject,
            CloneProject: cloneProject,

            ClassifyModel: runIntrospect('true'),
            RunIntrospect: runIntrospect('basic'),

            GetFiles: getFiles,
            UploadFile: uploadFile,
            DeleteFile: deleteFile,

            GetRMRecipe: getRecipe('threshold'),
            GetMeasurementRecipe: getRecipe('measurement'),
            GetLexiconRecipe: getRecipe('lexicon'),
            GetEclipseRecipe: getRecipe('transformation'),
            CreateMeasurementRecipe: createRecipe('measurement'),
            CreateRMRecipe: createRecipe('threshold'),
            CreateLexiconRecipe: createRecipe('lexicon'),
            CreateEclipseRecipe: createRecipe('transformation'),
            UpdateRMRecipe: updateRecipe('threshold'),
            UpdateMeasurementRecipe: updateRecipe('measurement'),
            UpdateLexiconRecipe: updateRecipe('lexicon'),
            UpdateEclipseRecipe: updateRecipe('transformation'),
            DeleteLexiconRecipe: deleteRecipe('lexicon'),

            MeasureRiskAsync: runOperation('measureRisk', 'riskMeasurement'),
            ComputeThreshold: computeThreshold,

            RunMaskAsync: runLexiconOperation('mask'),

            RunDeid: runOperation('transform', 'deid')
        };

        var baseURL = '/api/1.0/projects/';
        var zipTypes = ["application/zip", "application/x-zip-compressed"];
        var jsonHeaderProject = {
            'Content-Type': 'application/vnd.privacyanalytics.project+json',
            'Accept': 'application/vnd.privacyanalytics.project+json'
        };
        var jsonHeaderRecipe = {
            threshold: {
                'Content-Type': 'application/vnd.privacyanalytics.threshold.thresholdrecipe+json'
            },
            lexicon: {
                'Content-Type': 'application/vnd.privacyanalytics.recipe.text+json',
                'Accept': 'application/vnd.privacyanalytics.recipe.text+json'
            },
            riskMeasurement: {
                'type': 'application/vnd.privacyanalytics.it-riskmeasurementrecipe+json'
            },
            deid: {
                'type': 'application/vnd.privacyanalytics.transformationrecipe+json'
            },
            transformation: {
                'Content-Type': 'application/vnd.privacyanalytics.transformationrecipe+json'
            },
            measurement: {
                'Content-Type': 'application/vnd.privacyanalytics.it-riskmeasurementrecipe+json'
            }
        };

        return service;
        //////////////////

        /**
         * @memberOf APIs.projectsAPI
         * @param method
         * @param dataType
         * @param relativeURL
         * @param logMsg
         * @param headers
         * @param data
         * @returns {*}
         */
        function makeRequest(method, dataType, relativeURL, logMsg, headers, data) {
            var request = {
                method: method,
                url: baseURL + relativeURL
            };

            if (headers)
                request.headers = headers;
            if (data)
                request.data = data;

            return $http(request)
                .then(function(data) {
                    if (logMsg) {
                        $log.info(logMsg);
                        $log.info(data.data);
                    }
                    return data.data;
                }, alert.HandleError(dataType, method.toLowerCase()));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param file
         * @returns {{Content-Type: *}}
         */
        function getHeadersForFile(file) {
            return {
                'Content-Type': io.CorrectMIMEType(file)
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function getProject(projectName) {
            return makeRequest('GET',
                'project',
                (projectName ? window.encodeURIComponent(projectName) : ''));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectObject
         * @returns {*}
         */
        function createProject(projectObject) {
            return makeRequest('POST',
                'project',
                '',
                '',
                jsonHeaderProject,
                angular.toJson(projectObject));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectObject
         * @returns {*}
         */
        function updateProject(projectObject) {
            return makeRequest('PUT',
                'project',
                window.encodeURIComponent(projectObject.name),
                '',
                jsonHeaderProject,
                angular.toJson(projectObject));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function deleteProject(projectName) {
            return makeRequest('DELETE',
                'project',
                window.encodeURIComponent(projectName),
                '', // technically we want .then(function () {}, alert.blahblah...)
                jsonHeaderProject);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @param newName
         * @returns {*}
         */
        function cloneProject(projectName, newName) {
            return makeRequest('POST',
                'project',
                "?copyFrom=" + window.encodeURIComponent(projectName) + "&copyTo=" + window.encodeURIComponent(newName),
                '',
                jsonHeaderProject);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param setting
         * @returns {Function}
         */
        function runIntrospect(setting) {
            return function(projectName) {
                return makeRequest('GET',
                    'project',
                    window.encodeURIComponent(projectName) + "?introspect=" + setting,
                    'success introspect');
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function getFiles(projectName) {
            return makeRequest('GET',
                'content',
                window.encodeURIComponent(projectName) + '/source');
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @param file
         * @param exists
         * @returns {*}
         */
        function uploadFile(projectName, file, exists) {
            var ending = tools.InArray(file.type, zipTypes) ? "" : file.name;

            return makeRequest(exists ? 'PUT' : 'POST',
                'content',
                window.encodeURIComponent(projectName) + '/source/' + window.encodeURIComponent(ending),
                '',
                getHeadersForFile(file),
                file);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @param fileName
         * @returns {*}
         */
        function deleteFile(projectName, fileName) {
            return makeRequest('DELETE',
                'content',
                window.encodeURIComponent(projectName) + '/source' + (fileName ? '/' + window.encodeURIComponent(fileName) : ''));
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function getRecipe(recipeType) {
            return function(projectName, recipeName) {
                return makeRequest('GET',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes/' + window.encodeURIComponent((angular.isDefined(recipeName) ? recipeName : projectName)),
                    '',
                    jsonHeaderRecipe[recipeType]);
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function createRecipe(recipeType) {
            return function(projectName, recipeObject) {
                return makeRequest('POST',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes',
                    '',
                    jsonHeaderRecipe[recipeType],
                    angular.toJson(recipeObject));
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function updateRecipe(recipeType) {
            return function(projectName, recipeObject) {
                return makeRequest('PUT',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes/' + window.encodeURIComponent(recipeObject.name),
                    'updated recipe',
                    jsonHeaderRecipe[recipeType],
                    angular.toJson(recipeObject));
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param recipeType
         * @returns {Function}
         */
        function deleteRecipe(recipeType) {
            return function(projectName, recipeName) {
                return makeRequest('DELETE',
                    'recipe' + recipeType,
                    window.encodeURIComponent(projectName) + '/recipes/' + window.encodeURIComponent(recipeName),
                    'delete recipe',
                    jsonHeaderRecipe[recipeType]);
            };
        }

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param operationName
         * @param recipeType
         * @returns {Function}
         */
        function runOperation(operationName, recipeType) {
            return function(projectName, recipeObject) {
                var currentDate = new Date();
                var theDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " @ " + addZero(currentDate.getHours()) + ":" + addZero(currentDate.getMinutes()) + ":" + addZero(currentDate.getSeconds());
                return $http({
                    method: 'POST',
                    url: baseURL + window.encodeURIComponent(projectName) + "?operation=" + operationName + "&jobName=" + window.encodeURIComponent(projectName + " - " + (recipeType === "riskMeasurement" ? tools.CapitalizeString(recipeObject.measurementType) : "transform") + " - " + theDate) + "&async=1",
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: function(data) {
                        var formData = new FormData();
                        formData.append("recipe", new Blob([angular.toJson(recipeObject)], jsonHeaderRecipe[recipeType]));
                        return formData;
                    },
                    data: {model: recipeObject}
                })
                    .then(function(data) {
                        return data.data;
                    }, alert.HandleError("risk", "post"));
            };
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param projectName
         * @returns {*}
         */
        function computeThreshold(projectName) {
            return makeRequest('POST',
                'threshold',
                window.encodeURIComponent(projectName) + '?recipe=' + window.encodeURIComponent(projectName) + '&operation=computeThreshold',
                '',
                jsonHeaderProject);
        }

        /**
         * @memberOf APIs.projectsAPI
         * @param operation
         * @returns {Function}
         */
        function runLexiconOperation(operation) {
            return function(projectName, recipeName) {
                var currentDate = new Date();
                var theDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " @ " + addZero(currentDate.getHours()) + ":" + addZero(currentDate.getMinutes()) + ":" + addZero(currentDate.getSeconds());
                return makeRequest('POST',
                    'project',
                    window.encodeURIComponent(projectName) + '?recipe=' + window.encodeURIComponent((angular.isDefined(recipeName) ? recipeName : projectName)) + '&operation=' + operation + '&jobName=' + window.encodeURIComponent(projectName + " - " + tools.CapitalizeString(operation) + " - " + theDate) + '&async=1',
                    '',
                    jsonHeaderProject);
            };
        }
    }
})();

/**
 * Created by jkane on 16/09/2015.
 */
(function() {
    'use strict';

    reportsAPI.$inject = ['$http', '$log', 'alert'];
    angular.module('app.core')
           .factory('reportsAPI', reportsAPI);

    /* @ngInject */
    /**
     * @namespace reportsAPI
     * @memberOf APIs
     * @param $http
     * @param $log
     * @param alert
     * @returns {{GetReport: getReport}}
     */
    function reportsAPI($http, $log, alert) {
        var service = {
            GetReport: getReport
        };
        var baseURL = '/api/1.0/reports/';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.reportsAPI
         * @param reportContentType
         * @param jobId
         * @param thresholdRecipeName
         * @param isPreDeid
         * @returns {*}
         */
        function getReport(reportContentType, jobId, thresholdRecipeName, isPreDeid) {
            var reportName = (reportContentType === 'application/pdf') ? isPreDeid ? 'summaryPredeid' : 'summaryPostdeid' : isPreDeid ? 'comprehensivePredeid' : 'comprehensivePostdeid';
            var includeRaqs = (reportContentType === 'application/zip') ? 'true' : 'false';

            // XMLHttpRequest objects must have responseType = arrayBuffer in order to construct a blob from the response data
            return $http({
                method: 'GET',
                headers: {
                    'Accept': reportContentType
                },
                responseType: 'arraybuffer',
                url: baseURL + reportName + '/job/' + window.encodeURIComponent(jobId) + '?threshold=' + window.encodeURIComponent(thresholdRecipeName) + '&includeRaqs=' + includeRaqs
            })
                .then(function(data) {
                    $log.info(data.headers("Content-Type"));
                    data.contentType = data.headers("Content-Type");
                    return data;
                }, alert.HandleError("report", "get"));
        }
    }
})();
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

/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    semanticAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('semanticAPI', semanticAPI);

    /* @ngInject */
    /**
     * @namespace semanticAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetNames: *, GetTypes: *, GetNamesWithCollection: *}}
     */
    function semanticAPI($http, alert) {
        var service = {
            GetNames: makeRequestBuilder('names'),
            GetTypes: makeRequestBuilder('types'),
            GetNamesWithCollection: makeRequestBuilder('namesWithCollection')
        };
        var baseURL = '/api/1.0/semantic/';

        return service;
        //////////////////

        /**
         * @memberOf APIs.semanticAPI
         * @param relativeURL
         * @returns {Function}
         */
        function makeRequestBuilder(relativeURL) {
            return function() {
                return $http({
                    method: 'GET',
                    url: baseURL + relativeURL
                })
                    .then(function(data) {
                        return data.data;
                    }, alert.HandleError('semantic', 'get'));
            };
        }
    }
})();

/**
 * Created by mtucciarone on 22/07/2015.
 */
(function() {
    'use strict';

    thresholdsAPI.$inject = ['$http', '$log', 'alert'];
    angular.module('app.core')
           .factory('thresholdsAPI', thresholdsAPI);

    /* @ngInject */
    /**
     * @namespace thresholdsAPI
     * @memberOf APIs
     * @param $http
     * @param $log
     * @param alert
     * @returns {{ComputeJobThreshold: computeJobThreshold, ComputeProjectThreshold: computeProjectThreshold}}
     */
    function thresholdsAPI($http, $log, alert) {
        var service = {
            ComputeJobThreshold: computeJobThreshold,
            ComputeProjectThreshold: computeProjectThreshold
        };
        var baseURL = '/api/1.0/thresholds/';

        return service;
        //////////////////

        /**
         * @memberOf APIs.thresholdsAPI
         * @param projectName
         * @param jobID
         * @returns {*}
         */
        function computeJobThreshold(projectName, jobID) {
            return makeRequest('POST',
                'threshold',
                window.encodeURIComponent(projectName) + '?jobId=' + window.encodeURIComponent(jobID) + '&recipeName=' + window.encodeURIComponent(projectName) + '&operation=computeThreshold',
                '');
        }

        /**
         * @memberOf APIs.thresholdsAPI
         * @param projectName
         * @returns {*}
         */
        function computeProjectThreshold(projectName) {
            return makeRequest('POST',
                'threshold',
                window.encodeURIComponent(projectName) + '?recipeName=' + window.encodeURIComponent(projectName) + '&operation=computeThreshold',
                '');
        }

        /**
         * @memberOf APIs.thresholdsAPI
         * @param method
         * @param dataType
         * @param relativeURL
         * @param logMsg
         * @param headers
         * @param data
         * @returns {*}
         */
        function makeRequest(method, dataType, relativeURL, logMsg, headers, data) {
            var request = {
                method: method,
                url: baseURL + relativeURL
            };

            if (headers)
                request.headers = headers;
            if (data)
                request.data = data;

            return $http(request)
                .then(function(data) {
                    if (logMsg) {
                        $log.info(logMsg);
                        $log.info(data.data);
                    }
                    return data.data;
                }, alert.HandleError(dataType, method.toLowerCase()));
        }
    }
})();

/**
 * Created by mtucciarone on 23/07/2015.
 */
(function() {
    'use strict';

    tokensAPI.$inject = ['$http', 'alert'];
    angular.module('app.core')
           .factory('tokensAPI', tokensAPI);

    /* @ngInject */
    /**
     * @namespace tokensAPI
     * @memberOf APIs
     * @param $http
     * @param alert
     * @returns {{GetToken: getToken}}
     */
    function tokensAPI($http, alert) {
        var service = {
            GetToken: getToken
        };
        var baseURL = '/api/1.0/tokens';

        return service;
        //////////////////

        // TODO: Refactor all $http calls
        /**
         * @memberOf APIs.tokensAPI
         * @param userCredentials
         * @returns {*}
         */
        function getToken(userCredentials) {
            return $http({
                method: 'GET',
                url: baseURL,
                ignoreAuthModule: true,
                headers: {
                    'Authorization': userCredentials
                }
            })
                .then(function(data) {
                    return data.data;
                }, alert.HandleError("token", "get"));
        }
    }
})();

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

/**
 * Created by mtucciarone on 18/12/2015.
 */
(function() {
    'use strict';

    run.$inject = ['$rootScope', 'access', '$state'];
    configure.$inject = ['$provide', '$compileProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', 'IdleProvider', 'KeepaliveProvider', '$animateProvider', 'routerConfigProvider', 'valdrProvider', 'validationConfigProvider'];
    var core = angular.module('app.core');

    var config = {
        appId: 'mlibrary',
        appErrorPrefix: 'MLIB.',
        appTitle: 'MLibrary',
        version: '2.5',
        supportedFileFormats: '.csv, text/csv, application/zip, application/vnd.ms-excel, application/x-zip-compressed'
    };

    core.value('config', config);
    core.value('maxFileSize', 256 * 1000000);

    core.config(configure);

    /* @ngInject */
    function configure($provide, $compileProvider, $httpProvider, $stateProvider, $urlRouterProvider, IdleProvider, KeepaliveProvider, $animateProvider, routerConfigProvider, valdrProvider, validationConfigProvider) {
        /* If set to false, disables the use of Protractor and Batarang
         * Another problem with setting this to false is that the convential on-change method for
         * file upload will not be able to find angular.element.scope because there is no scope when debug mode is off
         * See the change request here: https://github.com/angular/angular.js/issues/1375
         * For now, we will have to leave this on
         */
        $compileProvider.debugInfoEnabled(true);

        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        $httpProvider.defaults.headers.common.Pragma = 'no-cache';
        $httpProvider.defaults.headers.common.Expires = '0';

        routerConfigProvider.config.$stateProvider = $stateProvider;
        routerConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routerConfigProvider.config.docTitle = 'MLibrary: ';

        // configure Idle settings
        IdleProvider.idle(10 * 60); // in seconds
        IdleProvider.timeout(30); // in seconds
        KeepaliveProvider.interval(2); // in seconds

        $animateProvider.classNameFilter(/animate-repeat/);

        valdrProvider.addValidator('badSymbols');
        valdrProvider.addValidator('prevalencePercentage');
        valdrProvider.addValidator('onlyNumbers');
        valdrProvider.addConstraints(validationConfigProvider.constraints);
    }

    core.run(run);

    function run($rootScope, access, $state) {
        // Listen to '$locationChangeSuccess', not '$stateChangeStart'
        $rootScope.$on('$locationChangeSuccess', function() {
            if (!access.isLoggedIn && $state.current.name !== 'login' && $state.current.name !== 'signup') {
                $state.go('signup');
            }
        });
    }

})();
/**
 * Created by mtucciarone on 11/05/2016.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('giveFocus', ['$timeout', function($timeout) {
               return {
                   restrict: 'AC',
                   link: function(_scope, _element) {
                       $timeout(function() {
                           _element[0].focus();
                       }, 50);
                   }
               };
           }]);
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */

(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paFooter', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/footer.html'
               };
           });
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paHeader', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/header.html',
                   transclude: true,
                   scope: {
                       'home': '&logoClick'
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 31/05/2016.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paInputSeparator', ['$filter', function($filter) {
               return {
                   require: 'ngModel',
                   restrict: 'A',
                   link: function(scope, elm, attrs, ctrl) {
                       ctrl.$formatters.unshift(function() {
                           return $filter('number')(ctrl.$modelValue);
                       });

                       ctrl.$parsers.unshift(function(val) {
                           var unformatted = val.replace(/[\,\.]/g, '');
                           var formatted = $filter('number')(unformatted);
                           elm.val(formatted);
                           return unformatted;
                       });
                   }
               };
           }]);
})();
/**
 * Created by mtucciarone on 15/01/2016.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paModalError', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/modal-error.html',
                   scope: {
                       'alertobject': '='
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 15/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('percentage', function() {
               return {
                   require: 'ngModel',
                   restrict: 'A',
                   link: function(scope, elm, attrs, ctrl) {
                       ctrl.$validators.percentage = function(modelValue) {
                           return (ctrl.$isEmpty(modelValue) || (0 <= modelValue && modelValue <= 100));
                       };
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paProgressbar', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/progressbar.html',
                   transclude: true,
                   scope: {
                       barValue: '=',
                       displayValue: '='
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paSpinner', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/spinner.html',
                   scope: {
                       spinText: '@'
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paSplashImage', ['config', function(config) {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/splash-image.html',
                   link: function(scope, elm, attrs, ctrl) {
                       scope.imgSource = "content/images/splash.png";
                   }
               };
           }]);
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paSubnav', ['$state', 'tools', function($state, tools) {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/subnav.html',
                   transclude: true,
                   scope: {
                       navItems: '='
                   },
                   link: function(scope, elm, attrs, ctrl) {
                       scope.IsCurrent = function(navItem) {
                           var current = $state.current.name.indexOf(navItem.Link) !== -1;
                           if (current)
                               navItem.Enabled = true;
                           return current;
                       };
                   }
               };
           }]);
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.edit')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        getCurrentProject.$inject = ['jsonStorage', 'router', 'alert', 'tools'];
        function getCurrentProject(jsonStorage, router, alert, tools) {
            var currentProjectName = tools.cookies.get("currentProjectName");
            if (!angular.isDefined(currentProjectName)) {
                alert.ErrorWriterNoCallback('app.add', '99', 'Project is not loaded');
                router.resetRoutes();
                router.go("status");
                return;
            }
            return jsonStorage.GetProjectByName(currentProjectName);
        }

        return [
            {
                name: 'edit',
                config: {
                    url: '/edit',
                    templateUrl: 'edit/edit.html',
                    controller: 'Edit',
                    controllerAs: 'vm',
                    title: 'Edit',
                    helpPage: 'Edit',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-pencil fa-lg pad-right-2 pad-top"></i><b>Edit</b>',
                        enabled: false
                    },
                    resolve: {
                        currentProject: getCurrentProject
                    }
                }
            }
        ];
    }
})();
/**
 * Created by mtucciarone on 17/08/2015.
 */
(function() {
    Edit.$inject = ['emailAPI', 'tools', 'alert', 'currentProject'];
    angular.module('app.edit')
           .controller('Edit', Edit);

    /* @ngInject */
    function Edit(emailAPI, tools, alert, currentProject) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.edit";

        vm.HasLoaded = false;
        vm.SubmitEmail = submitEmail;

        loadPage();

        //////////////////

        function loadPage() {
            vm.HasLoaded = true;
        }

        function submitEmail() {
            tools.log.info("i am called");
            if (!angular.isDefined(vm.email)) {
                vm.Message = "Email is empty";
            }
            else {
                var emailObj = {
                    email: vm.email
                };
                emailAPI.SubmitEmail(emailObj)
                    .then(function(returnJson) {
                        vm.Message = "Your email has been successfully submitted!";
                    }, function(error) {
                        tools.log.info(error);
                        vm.Message = error.data.errors.email[0];
                    });
                // submit;
            }
        }
    }
})();
/**
 * Created by mtucciarone on 15/12/2015.
 */

(function() {
    'use strict';

    angular.module('app.filters')
           .filter('prettyClassification', function() {
               return function(input) {
                   if (input) input = input.toUpperCase();
                   switch (input) {
                       case 'TEXT':
                           return "TEXT";
                       case 'DI':
                           return "Direct Identifier";
                       case 'QI':
                           return "Quasi-Identifier";
                       case 'PQI':
                           return "Public Quasi-Identifier";
                       case 'AQI':
                           return "Acquaintance Quasi-Identifier";
                       case 'NI':
                           return "Non-Identifier";
                       case '':
                           return "Please Classify";
                       case null:
                           return "Please Classify";
                       case undefined:
                           return "Please Classify";
                       default:
                           return "Please Classify";
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 20/11/2015.
 */
(function() {
    'use strict';

    angular.module('app.filters')
        .filter('prettyDataType', function() {
            return function(input) {
                if (input) input = input.toUpperCase();

                switch (input) {
                    case 'STRING':
                        return "String";
                    case 'TIMESTAMP':
                        return "Date";
                    case 'DATE':
                        return "Date";
                    case 'LONG':
                        return "Long";
                    case 'DOUBLE':
                        return "Double";
                    case 'UNSUPPORTED':
                        return "Unsupported";
                    default:
                        return "Unsupported";
                }
            };
        });
})();

/**
 * Created by mtucciarone on 15/12/2015.
 */

(function() {
    'use strict';

    angular.module('app.filters')
           .filter('prettyGroupType', function() {
               return function(input) {
                   if (input) input = input.toUpperCase();
                   switch (input) {
                       case 'DATES':
                           return "Date Shifting";
                       case 'DATES_QI':
                            return "Dates QI";
                       case 'LOCATIONS_QI':
                           return "Locations";
                       case 'MEDICAL_QI':
                           return "Medical";
                       default:
                           return "OTHER";
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 15/12/2015.
 */

(function() {
    'use strict';

    angular.module('app.filters')
           .filter('prettyMaskingStrategy', function() {
               return function(input) {
                   if (input) input = input.toUpperCase();
                   switch (input) {
                       case 'MASK':
                           return "Mask";
                       case 'MASKRANGE':
                           return "Mask Range";
                       case 'MASKENTITY':
                           return "Mask Entity";
                       case 'GENERALIZEDATE':
                           return "Generalize Date";
                       case 'GENERALIZEDOUBLE':
                           return "Generalize Double";
                       case 'GENERALIZELONG':
                           return "Generalize Long";
                       case 'GENERALIZESTRING':
                           return "Substring";
                       case 'MASKCPT':
                           return "Mask CPT";
                       case 'MASKCOMBO':
                           return "Mask Combo";
                       case 'MASKCONSTANT':
                           return "Mask Constant";
                       case 'MASKID':
                           return "Mask ID";
                       case 'MASKMULTIRANGE':
                           return "Mask Multirange";
                       case 'MASKNULL':
                           return "Masking Null";
                       case 'MASKSEMANTIC':
                           return "Mask as";
                       case 'MASKSELECT':
                           return "Mask Select";
                       case 'MASKSTREET':
                           return "Mask Street";
                       case 'MASKVARYINGID':
                           return "Masking Varying ID";
                       case 'REDACT':
                           return "Redact";
                       case 'SHIFT':
                           return "Shifting";
                       case 'NOP':
                            return "No Generalization";
                       case '':
                           return "Please Specify";
                       case null:
                           return "Please Specify";
                       case undefined:
                           return "Please Specify";
                       default:
                           return "Please Specify";
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 15/12/2015.
 */

(function() {
    'use strict';

    angular.module('app.filters')
           .filter('prettyDestinationTarget', function() {
               return function(input) {
                   if (input) input = input.toUpperCase();
                   switch (input) {
                       case 'DROPCREATE':
                           return "Drop and Create";
                       case 'CREATE':
                           return "Create";
                       case 'USEEXISTING':
                            return "Use Existing";
                       default:
                           return "Drop and Create";
                   }
               };
           });
})();
/**
 * Created by mtucciarone on 10/08/2015.
 */
(function() {

    About.$inject = ['$modalInstance', 'config'];
    angular.module('app.layout')
           .controller('About', About);

    /* @ngInject */
    function About($modalInstance, config) {
        var vm = this;

        vm.appName = config.appTitle;
        vm.appVersion = config.version;
        vm.cancel = function cancel() {
            $modalInstance.dismiss('cancel');
        };
    }
})();
/**
 * Created by mtucciarone on 23/06/2015.
 */
(function() {
    ActionModal.$inject = ['$modalInstance', 'object', 'action', 'explanation'];
    angular.module('app.layout')
           .controller('ActionModal', ActionModal);

    /* @ngInject */
    function ActionModal($modalInstance, object, action, explanation) {
        var vm = this;
        vm.TheObject = object ? object : "";
        vm.TheAction = action ? action : "";
        vm.TheExplanation = explanation ? explanation : "";
        vm.Yes = function() { $modalInstance.close(true); };
        vm.No = function() { $modalInstance.close(false); };
    }
})();
/**
 * Created by mtucciarone on 13/05/2015.
 */
(function() {
    DatesModal.$inject = ['$modalInstance', 'alert', 'configAPI', 'preferredDateFormats'];
    angular.module('app.layout')
           .controller('DatesModal', DatesModal);

    /* @ngInject */
    function DatesModal($modalInstance, alert, configAPI, preferredDateFormats) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.SetAdvanced = setAdvanced;
        vm.Cancel = cancel;

        loadPage();

        //////////////////

        function loadPage() {
            configAPI.GetLexiconDateFormats()
                     .then(
                         function(data) {
                             if (preferredDateFormats && (preferredDateFormats.length > 0)) {
                                 // recipe contains data on preferred date formats (array of strings)
                                 preferredDateFormats.forEach(function(formatStr) {
                                     // populate vm.models.lists.A with the recipe data, in order
                                     vm.models.lists.A.list.push({label: formatStr});
                                 });
                                 data.forEach(function(record) {
                                     // now populate the unused ones from the API data
                                     if (preferredDateFormats.indexOf(record.format) === -1) {
                                         // if it's not in the left-hand column, it goes in the right-hand column
                                         vm.models.lists.B.list.push({label: record.format});
                                     }
                                 });
                             }
                             else {
                                 // use API data
                                 data.forEach(function(record) {
                                     (record.isDefault ? vm.models.lists.A : vm.models.lists.B).list.push({label: record.format});
                                 });
                             }
                         },
                         function(data) {
                             vm.error = alert.ErrorWriterModal(data, moduleName, '11', 'Error editing the group');
                         }
                     );
        }

        function setAdvanced() {
            // return the array of strings in the left-hand box
            $modalInstance.close(vm.models.lists.A.list.map(function(record) {
                return record.label;
            }));
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        vm.models = {
            selected: null,
            lists: {
                "A": {
                    title: "Date Formats to be Detected (Ordered)",
                    list: []
                }, "B": {
                    title: "Unused Date Formats",
                    list: []
                }
            }
        };

    }
})();
/**
 * Created by mtucciarone on 10/09/2015.
 */
(function() {
    RetryModal.$inject = ['$modalInstance', 'tokensAPI', 'auth', 'access', 'alert'];
    angular.module('app.layout')
           .controller('RetryModal', RetryModal);

    /* @ngInject */
    function RetryModal($modalInstance, tokensAPI, auth, access, alert) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.user = {};
        vm.Relogin = relogin;
        vm.Cancel = cancel;

        //////////////////

        function relogin() {
            var base64UserNamePwd = $.base64.encode(vm.user.name + ":" + vm.user.password);
            var userCredentials = "Basic " + base64UserNamePwd;
            tokensAPI.GetToken(userCredentials)
                     .then(function(token) {
                             vm.user = token.user;
                             access.Login(token);
                             auth.loginConfirmed('success', function(config) {
                                 config.headers.Authorization = "Bearer " + token.token;
                                 return config;
                             });
                             // Will resolve the promise
                             $modalInstance.close();
                         },
                         function(data) {
                             vm.error = alert.ErrorWriterModal(data, moduleName, '01', 'Error signing in the user');
                         });
        }

        function cancel() {
            // Will reject the promise
            $modalInstance.dismiss();
        }

    }
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.layout')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'layout/login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            }
        ];
    }
})();
(function() {
    'use strict';

    Login.$inject = ['tools', '$window', 'Idle', 'access', 'config', 'alert', 'tokensAPI', 'usersAPI', '$state'];
    angular.module('app.layout')
           .controller('Login', Login);

    /* @ngInject */
    function Login(tools, $window, Idle, access, config, alert, tokensAPI, usersAPI, $state) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.Login = login;

        loadPage();

        //////////////////

        function loadPage() {
            // always ensure the user is not logged in
            access.accessToken = null;
            access.isLoggedIn = false;

            vm.applicationName = config.appTitle + " " + config.version;
            vm.user = {};
            vm.loggedIn = false;
        }

        function login() {
            access.login();
            $state.go('status');
        }
    }
})();
/**
 * Created by mtucciarone on 21/04/2015.
 */
(function() {
    Menu.$inject = ['$scope', 'access', 'jsonStorage', 'tools', '$state', 'router'];
    angular.module('app.layout')
           .controller('Menu', Menu);

    /* @ngInject */
    function Menu($scope, access, jsonStorage, tools, $state, router) {
        var vm = this;
        var loginRequiredModalOpen = false;
        var routes = router.getRoutes();
        vm.GetCurrentProject = getCurrentProject;
        vm.isCurrent = isCurrent;
        vm.navRoutes = populateMenu();
        vm.ProfileLink = {
            Title: access.GetUserFullName,
            name: 'profile'
        };
        vm.GeneralNav = jsonStorage.getItem("layout.menu", "GeneralNav");

        loadPage();

        //////////////////

        function populateMenu() {
            return routes.filter(function(route) {
                return route.settings;
            })
                         .sort(function(r1, r2) {
                             return r1.settings.nav - r2.settings.nav;
                         });
        }

        function getCurrentProject() {
            try {
                if (tools.cookies.get('currentProjectName')) {
                    vm.ProjectLoaded = true;
                    return tools.cookies.get('currentProjectName');
                }
            }
            catch (e) {
            }
        }

        function loadPage() {
            vm.show = false;
            vm.ProjectLoaded = false;
            vm.GetCurrentProject();
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return false;
            }
            var menuName = route.name;
            return $state.current.name.substr(0, menuName.length) === menuName;
        }

        $scope.$on('event:auth-loginRequired', function() {
            if (loginRequiredModalOpen) return;
            var modalInstance = tools.modal.open({
                templateUrl: 'layout/generic/retry-login-modal.html',
                controller: 'RetryModal',
                controllerAs: 'vm',
                backdrop: false
            });

            loginRequiredModalOpen = true;

            modalInstance.result.then(function() {
                loginRequiredModalOpen = false;
            }, function() {
                loginRequiredModalOpen = false;
            });
        });

        $scope.$on('event:auth-loginConfirmed', function() {

        });

        $scope.$watch(function() {
            return access.isLoggedIn;
        }, function(newVal) {
            vm.show = newVal;
        });

        $scope.$watch(function() {
            return access.GetUserFullName();
        }, function(newVal) {
            vm.ProfileLink.Title = access.GetUserFullName();
        });

        $scope.$watch(function() {
            return tools.cookies.get('currentProjectName');
        }, function(newVal) {
            vm.ProjectLoaded = newVal;
        });

    }
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.layout')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'profile',
                config: {
                    url: '/profile',
                    templateUrl: 'layout/profile/profile.html',
                    helpPage: 'Profile',
                    controller: 'Profile',
                    controllerAs: 'vm',
                    title: 'Profile'
                }
            }
        ];
    }
})();
/**
 * Created by mtucciarone on 28/04/2015.
 */
(function() {
    Profile.$inject = ['usersAPI', 'tokensAPI', 'Idle', 'access', 'alert', 'tools'];
    angular.module('app.layout')
           .controller('Profile', Profile);

    /* @ngInject */
    function Profile(usersAPI, tokensAPI, Idle, access, alert, tools) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.displayNameUnlocked = false;
        vm.emailUnlocked = false;
        vm.tempInput = {};
        vm.isEditingInput = false;
        vm.StartEditInput = startEditInput;
        vm.DiscardInputChanges = discardInputChanges;
        vm.SaveChangesInput = saveChangesInput;
        vm.ChangePassword = changePassword;

        loadPage();

        //////////////////

        function loadPage() {
            vm.user = access.getUser();
        }

        function startEditInput(type, input) {
            vm.isEditingInput = true;
            if (type === "name") {
                vm.displayNameEdit = true;
                vm.tempInput.name = input;
            }
            else {
                vm.emailEdit = true;
                vm.tempInput.email = input;
            }
        }

        function discardInputChanges(type) {
            vm.isEditingInput = false;
            if (type === "name")
                vm.displayNameEdit = false;
            else
                vm.emailEdit = false;
        }

        function saveChangesInput(type) {
            if (type === "name") {
                vm.user.displayName = (vm.tempInput.name || vm.user.name);
            }
            else {
                vm.user.email = vm.tempInput.email;
            }

            usersAPI.EditUser(vm.user)
                    .then(function(user) {
                        vm.user = user;
                        access.user = user;
                    }, alert.ErrorWriter(moduleName, '02', 'Error updating user'));
            vm.displayNameEdit = false;
            vm.emailEdit = false;
            vm.tempInput = {};
            vm.isEditingInput = false;
        }

        function changePassword(updatedPassword) {
            usersAPI.UpdatePassword(vm.user.id, updatedPassword)
                    .then(function() {
                        alert.SuccessWriter("updated password!");
                        var base64UserNamePwd = $.base64.encode(vm.user.name + ":" + updatedPassword.verifyNewPwd);
                        var userCredentials = "Basic " + base64UserNamePwd;
                        tokensAPI.GetToken(userCredentials)
                                 .then(function(token) {
                                     Idle.watch();
                                     vm.user = token.user;
                                     access.Login(token)
                                           .then(function() {
                                               updatedPassword.currentPwd = "";
                                               updatedPassword.newPwd = "";
                                               updatedPassword.verifyNewPwd = "";
                                               vm.profileForm.$setPristine();
                                               tools.log.info("replaced old token with new token");
                                           });
                                 }, alert.ErrorWriter(moduleName, '04', 'Failed to re-login user'));
                    }, alert.ErrorWriter(moduleName, '03', 'Error updating password'));
        }

    }
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.layout')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'signup',
                config: {
                    url: '/signup',
                    templateUrl: 'layout/signup/signup.html',
                    controller: 'SignUp',
                    controllerAs: 'vm',
                    title: 'Sign Up'
                }
            }
        ];
    }
})();
/**
 * Created by mtucciarone on 05/05/2015.
 */
(function() {
    SignUp.$inject = ['alert', 'tools', 'access', '$state'];
    angular.module('app.layout')
           .controller('SignUp', SignUp);

    /* @ngInject */
    function SignUp(alert, tools, access, $state) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.layout";

        vm.SignUp = signUp;

        //////////////////

        function signUp() {
            vm.IsWorking = true;

            if (vm.modelUser.password !== vm.modelUser.verifyPassword) {
                alert.ErrorWriterNoCallback(moduleName, '02', 'Passwords do not match');
                vm.signupForm.verifyPassword.$invalid = true;
                vm.signupForm.verifyPassword.$valid = false;
                vm.signupForm.verifyPassword.valdrViolations = [
                    {
                        field: 'verifyPassword',
                        message: 'Must match the password',
                        type: 'User',
                        valid: 'false',
                        value: vm.modelUser.verifyPassword
                    }
                ];
                vm.IsWorking = false;
                return;
            }
            access.user = {
                name: vm.modelUser.name,
                displayName: vm.modelUser.name
            };
            $state.go("login");
        }

    }
})();
/**
 * Created by mtucciarone on 17/08/2015.
 */
(function() {

    Listen.$inject = ['$scope', 'config', 'alert', 'tools', 'jsonStorage', 'router', 'defaultriskassessmentsAPI', 'riskassessmentsAPI', 'thresholdsAPI', 'projectsAPI', 'currentProject', 'measurementRecipe'];
    angular.module('app.listen')
           .controller('Listen', Listen);

    /* @ngInject */
    function Listen($scope, config, alert, tools, jsonStorage, router, defaultriskassessmentsAPI, riskassessmentsAPI, thresholdsAPI, projectsAPI, currentProject, measurementRecipe) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.listen";
        $scope.SelectFile = selectFile;

        vm.currentProject = currentProject;
        vm.appId = config.appId;
        vm.HasLoaded = false;
        vm.SupportedFileFormats = ["application/pdf"];
        vm.ResetValues = resetValues;
        vm.OpenIOP = openIOP;
        vm.currentRiskSettings = {};
        vm.dataDetails = {};
        vm.tempInput = {};
        vm.CustomPopulation = customPopulation;
        vm.SaveModel = saveModel;
        vm.isEditingInput = false;
        vm.StartEditInput = startEditInput;
        vm.DiscardInputChanges = discardInputChanges;
        vm.GoBack = goBack;
        vm.RunRiskMeasurement = runRiskMeasurement;
        vm.SkipToDeid = skipToDeid;
        vm.PopulationSizes = jsonStorage.getItem("context", "PopulationSizes");
        vm.privacyAndSecuritySlider = new slider('securityControls', 2, 0, 3, ["None",
            "Low",
            "HIPAA",
            "High"]);
        vm.recipientTrustSlider = new slider('recipientTrust', 1, 0, 3, ["None",
            "Low",
            "Medium",
            "High"]);
        vm.iopSlider = new slider('privacy', 3, 0, 7, ["Low:0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "High:7"]);

        loadTooltips();
        loadPage();

        //////////////////

        function loadPage() {
            convertFromModelToTemp();
            getRecipeOrCreate();
        }

        function loadTooltips() {
            vm.loadMitigatingCtrlsTip = dict.LoadMitigatingCtrlsRAQButton;
            vm.loadMotiveCapacityTip = dict.LoadMotiveCapacityContractRAQButton;
            vm.loadIOPTip = dict.LoadIoPRAQButton;
            vm.saveTip = dict.DiskIcon;
            vm.pencilTip = dict.PencilIcon;
            vm.cancelTip = dict.CancelIcon;
        }

        function getRecipeOrCreate() {
            var createResult = function(recipe) {
                vm.currentRecipe = recipe;
                tools.log.info("recipe:");
                tools.log.info(recipe);
                thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                             .then(function(thresholdResult) {
                                 vm.privacyAndSecuritySlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                 vm.privacyAndSecuritySlider.LoadPDF = function() {
                                     uploadedFileTrigger('#privacyAndSecurity');
                                 };
                                 vm.privacyAndSecuritySlider.DeletePDF = function() {
                                     removePDF("Privacy & Security Assessment", 'securityControls');
                                 };
                                 vm.recipientTrustSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                 vm.recipientTrustSlider.LoadPDF = function() {
                                     uploadedFileTrigger('#recipientTrust');
                                 };
                                 vm.recipientTrustSlider.DeletePDF = function() {
                                     removePDF("Recipient Trust Assessment", 'recipientTrust');
                                 };
                                 vm.iopSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                 vm.iopSlider.DeletePDF = function() {
                                     removeIOPFormPDF();
                                 };
                                 loadThresholdValues(thresholdResult);
                                 vm.HasLoaded = true;
                             }, function(data) {
                                 tools.log.info(data);
                                 tools.log.info("error getting default thresholds!");
                                 alert.ErrorWriterNoCallback(moduleName, '22', 'Error getting thresholds', data);
                                 router.go('status');
                             });
            };

            return projectsAPI.GetRMRecipe(vm.currentProject.name)
                              .then(createResult, function() {
                                      var recipeObject = {
                                          "name": vm.currentProject.name
                                      };
                                      projectsAPI.CreateRMRecipe(vm.currentProject.name, recipeObject)
                                                 .then(createResult, alert.ErrorWriter(moduleName, '33', 'Error creating recipe')
                                                 );
                                  }
                              );
        }

        function uploadedFileTrigger(elementName) {
            tools.timeout(function() {
                angular.element(elementName)
                       .trigger('click');
            }, 1);
        }

        function removePDF(formalName, sliderName) {
            tools.modal.open({
                templateUrl: 'layout/generic/action-modal.html',
                controller: 'ActionModal',
                controllerAs: 'vm',
                resolve: {
                    object: function() {
                        return formalName;
                    },
                    action: function() {
                        return "remove";
                    },
                    explanation: function() {
                        return "";
                    }
                }
            })
                 .result
                 .then(function(confirmed) {
                     if (confirmed) {
                         riskassessmentsAPI.RemoveForm(vm.currentProject.name, sliderName)
                                           .then(function() {
                                               thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                                                            .then(function(thresholdResult) {
                                                                loadThresholdValues(thresholdResult);
                                                            }, alert.ErrorWriter(moduleName, '28', 'Error computing threshold'));
                                           }, alert.ErrorWriter(moduleName, '29', 'Error deleting PDF'));
                     }
                 });
        }

        function removeIOPFormPDF() {
            tools.modal.open({
                templateUrl: 'layout/generic/action-modal.html',
                controller: 'ActionModal',
                controllerAs: 'vm',
                resolve: {
                    object: function() {
                        return "Data Sensitivity form";
                    },
                    action: function() {
                        return "remove";
                    },
                    explanation: function() {
                        return "";
                    }
                }
            })
                 .result
                 .then(function(confirmed) {
                     if (confirmed) {
                         vm.currentProject.privacy = null;
                         projectsAPI.UpdateProject(vm.currentProject)
                                    .then(function(project) {
                                        vm.currentProject = project;
                                        thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                                                     .then(function(thresholdResult) {
                                                         loadThresholdValues(thresholdResult);
                                                     }, alert.ErrorWriter(moduleName, '30', 'Error computing threshold'));
                                    }, alert.ErrorWriter(moduleName, '31', 'Error filling out Data Sensitivity Assessment'));
                     }
                 });
        }

        function loadThresholdValues(thresholdResult) {
            vm.iopSlider.SetSliderValue(thresholdResult.scores.privacy);
            vm.privacyAndSecuritySlider.SetSliderValue(thresholdResult.scores.securityControls);
            vm.recipientTrustSlider.SetSliderValue(thresholdResult.scores.recipientTrust);
        }

        function customPopulation(popItem) {
            if (popItem) {
                if (popItem.id === "custom") {
                    vm.customPopulation = true;
                    if (popItem.size === -1) popItem.size = 0;
                }
                else {
                    vm.customPopulation = false;
                    vm.CustomPopulationEdit = false;
                }
                saveModel();
            }
        }

        function resetValues() {
            delete vm.currentRecipe.scores;
            tools.log.info('resetValues');
            tools.log.info(vm.currentRecipe);
            updateThreshold(vm.currentRecipe);
        }

        function openIOPModal(IOPForm, IOPFormResponse) {
            tools.modal.open({
                templateUrl: 'measurementResults/modals/iop-form.html',
                controller: 'DataSensitivityForm',
                controllerAs: 'vm',
                resolve: {
                    currentProject: function() {
                        return vm.currentProject;
                    },
                    formTemplate: function() {
                        return IOPForm;
                    },
                    formResponse: function() {
                        return IOPFormResponse;
                    }
                }
            })
                 .result
                 .then(function(project) {
                     if (project) {
                         vm.currentProject = project;
                         // remove -pr value in the recipe
                         delete vm.currentRecipe.scores.privacy;
                         updateThreshold(vm.currentRecipe);
                     }
                 });
        }

        function openIOP() {
            // get iop form and if 404 then call defaults API
            // otherwise just use the iop form returned
            defaultriskassessmentsAPI.GetForm("privacy")
                                     .then(function(IOPForm) {
                                         openIOPModal(IOPForm, vm.currentProject.privacy);
                                     }, alert.ErrorWriter(moduleName, '35', 'Error getting Data Sensitivity assessment'));
        }

        function convertFromModelToTemp() {
            if (tools.Exists(vm.currentProject.model.prevalence)) {
                var popItem = tools.ExtractElement(vm.PopulationSizes, 'size', vm.currentProject.model.population);
                tools.log.info(popItem);
                if (popItem) {
                    vm.dataDetails.populationItem = popItem;
                }
                else {
                    // if (!tools.Exists(vm.currentProject.model.population)) {
                    //     vm.dataDetails.populationItem = vm.PopulationSizes[2];
                    // }
                    // else {
                    vm.dataDetails.populationItem = vm.PopulationSizes[2];
                    vm.dataDetails.populationItem.size = vm.currentProject.model.population;
                    vm.customPopulation = true;
                    // }
                }
            }
            else {
                vm.dataDetails.populationItem = vm.PopulationSizes[0];
                vm.dataDetails.populationItem.size = vm.PopulationSizes[0].size;
            }

            vm.dataDetails.tempPrevalence = (tools.Exists(vm.currentProject.model.prevalence)) ?
                (vm.currentProject.model.prevalence * 100).toPrecision(6) : 100;

            // should this be switching on model.prevalence or model.sexSpecific?
            vm.dataDetails.sexSpecific = (tools.Exists(vm.currentProject.model.prevalence)) ?
                (vm.currentProject.model.sexSpecific) : false;

            // T2 settings here
            vm.dataDetails.t2 = {};
            if (tools.Exists(vm.currentProject.model.t2Enabled)) {
                vm.dataDetails.t2Enabled = vm.currentProject.model.t2Enabled;
                if (vm.currentProject.model.t2Population) {
                    vm.dataDetails.samePopulation = false;
                    vm.dataDetails.t2Population = vm.currentProject.model.t2Population;
                }
                else {
                    vm.dataDetails.samePopulation = true;
                }
            }
            else {
                vm.dataDetails.t2Enabled = true;
                vm.dataDetails.samePopulation = true;
                vm.dataDetails.t2Population = 0;
            }

            vm.madeChanges = false;
            vm.HasLoaded = true;
        }

        function updateThreshold(theRecipe) {
            tools.log.info(theRecipe);
            projectsAPI.UpdateRMRecipe(vm.currentProject.name, theRecipe)
                       .then(function(recipe) {
                           tools.log.info(recipe);
                           vm.currentRecipe = recipe;
                           thresholdsAPI.ComputeProjectThreshold(vm.currentProject.name)
                                        .then(function(thresholdResult) {
                                            vm.privacyAndSecuritySlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                            vm.recipientTrustSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                            vm.iopSlider.SetThresholdRecipe(vm.currentRecipe, updateThreshold);
                                            loadThresholdValues(thresholdResult);
                                        }, alert.ErrorWriter(moduleName, '18', 'Error computing threshold'));
                       }, alert.ErrorWriter(moduleName, '19', 'Error updating recipe'));
        }

        function goBack() {
            if (vm.currentProject.model && vm.currentProject.model.tables) {
                if (vm.currentProject.model.tables.length > 1) {
                    router.go('edit');
                }
                else {
                    router.go('add.summary');
                }
            }
        }

        function selectFile(file, fileType) {
            if (file.files[0]) {
                vm.currentSelectedFile = file.files[0];
                var returnCode = io.ValidateFile(file.files[0], vm.SupportedFileFormats);
                if (returnCode) {
                    vm.currentSelectedFile = null;
                    if (returnCode === 1)
                        alert.ErrorWriterNoCallback(moduleName, '20', 'Selected file is too big to upload');
                    if (returnCode === 2)
                        alert.ErrorWriterNoCallback(moduleName, '21', 'No support for this type of file: ' + file.files[0].type);
                    vm.currentSelectedFile = "";
                }
                else {
                    if (fileType === 'ds') {
                        vm.privacyAndSecuritySlider.UploadPDF(vm.currentProject.name, vm.currentSelectedFile);
                    }
                    if (fileType === 'rs') {
                        vm.recipientTrustSlider.UploadPDF(vm.currentProject.name, vm.currentSelectedFile);
                    }
                }
                file.value = null;
            }
        }

        function convertTempToAPI(datadetails) {
            vm.currentProject.model.prevalence = (datadetails.tempPrevalence * 0.01).toPrecision(6);
            vm.currentProject.model.population = datadetails.populationItem.size;
            vm.currentProject.model.sexSpecific = datadetails.sexSpecific;
            vm.currentProject.model.t2Enabled = datadetails.t2Enabled;
            vm.currentProject.model.t2Population = null;
            if (datadetails.t2Enabled && datadetails.samePopulation === false) {
                vm.currentProject.model.t2Population = datadetails.t2Population;
            }
            if (datadetails.t2Enabled && datadetails.samePopulation === true) {
                vm.currentProject.model.t2Population = null;
            }
        }

        function saveModel() {
            if (vm.dataDetailsForm.$valid) {
                vm.CustomPopulationEdit = false;
                vm.CustomT2PopulationEdit = false;
                vm.prevEdit = false;
                vm.isEditingInput = false;
                convertTempToAPI(vm.dataDetails);
                projectsAPI.UpdateProject(vm.currentProject)
                           .then(function(project) {
                               tools.log.info("updated project");
                               vm.currentProject = project;
                           }, alert.ErrorWriter(moduleName, '12', 'Error updating the project'));
            }
        }

        function startEditInput(type, input) {
            vm.isEditingInput = true;
            if (type === "pop") {
                vm.CustomPopulationEdit = true;
                vm.tempInput.pop = input;
            }
            else if (type === "t2pop") {
                vm.CustomT2PopulationEdit = true;
                vm.tempInput.t2pop = input;
            }
            else {
                vm.prevEdit = true;
                vm.tempInput.prev = input;
            }
        }

        function discardInputChanges(type) {
            vm.isEditingInput = false;
            if (type === "pop")
                vm.CustomPopulationEdit = false;
            else if (type === "t2pop")
                vm.CustomT2PopulationEdit = false;
            else
                vm.prevEdit = false;
        }

        function projectIsValid(project) {
            if (project.isModelValid) {
                vm.ModelInvalidMessages = "";
                vm.ModelInvalid = false;
                return true;
            }
            else {
                vm.ModelInvalid = true;
                var data = {
                    data: {
                        errorMessage: Array.from(new Set(project.modelValidationErrors))
                                           .map(function(error) {
                                               return error;
                                           })
                    }
                };
                alert.ErrorWriterNoCallback(moduleName, '89', project.modelValidationErrors[0], data);

                return false;
            }
        }

        function runRiskMeasurement() {
            function runMeasureRisk() {
                var tempProject = angular.copy(vm.currentProject);
                var hasRiskAssessment = (tempProject.riskAssessmentName === tempProject.name);
                if (!hasRiskAssessment)
                    tempProject.riskAssessmentName = tempProject.name;
                projectsAPI.UpdateProject(tempProject)
                           .then(function(project) {
                               tempProject = project;
                               alert.SuccessWriter("started measurement");
                               projectsAPI.MeasureRiskAsync(vm.currentProject.name, measurementRecipe)
                                          .then(tools.timeout(function() {
                                              router.go('status');
                                          }, 700), alert.ErrorWriter(moduleName, '09', 'Error measuring the risk'));
                           }, alert.ErrorWriter(moduleName, '12', 'Error updating the project'));
            }

            var allDIsMasked = modelTools.AreAllDIsMasked(vm.currentProject.model.tables);
            var allQIsMasked = modelTools.AreAllQIsMasked(vm.currentProject.model.tables);

            var isProjectValid = projectIsValid(vm.currentProject);

            if (allDIsMasked && allQIsMasked) {
                alert.ErrorWriterNoCallback(moduleName, '11', "You do not have anything to measure risk on");
                router.setRouteStates(['deidentify'], false);
                return;
            }
            else if (!allDIsMasked && vm.appId !== 'eclipse') {
                tools.modal.open({
                    templateUrl: 'layout/generic/action-modal.html',
                    controller: 'ActionModal',
                    controllerAs: 'vm',
                    resolve: {
                        object: function() {
                            return "risk measurement";
                        },
                        action: function() {
                            return "continue";
                        },
                        explanation: function() {
                            return "You have unmasked Direct Identifiers.";
                        }
                    }
                })
                     .result
                     .then(function(confirmed) {
                         if (confirmed) {
                             if (isProjectValid)
                                 runMeasureRisk();
                         }
                     });
            }
            else {
                if (isProjectValid)
                    runMeasureRisk();
            }
        }

        function skipToDeid() {
            var allDIsMasked = modelTools.AreAllDIsMasked(vm.currentProject.model.tables);
            var allQIsMasked = modelTools.AreAllQIsMasked(vm.currentProject.model.tables);

            var isProjectValid = projectIsValid(vm.currentProject);

            if (allDIsMasked && allQIsMasked) {
                alert.ErrorWriterNoCallback(moduleName, '12', "You do not have anything to apply de-identification to");
                router.setRouteStates(['deidentify'], false);
                return;
            }
            if (isProjectValid) {
                convertTempToAPI(vm.dataDetails);
                projectsAPI.UpdateProject(vm.currentProject)
                           .then(function(project) {
                               vm.currentProject = project;
                               router.getRouteState('measurementResults') ? router.go('measurementResults') : router.go("deidentify", true);
                           }, alert.ErrorWriter(moduleName, '65', 'Error updating the project'));
            }
        }

    }
})();
/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.listen')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        var showErrors = true;
        /* @ngInject */
        getMeasurementRecipe.$inject = ['projectsAPI', 'config', 'router', 'alert', 'tools'];
        getCurrentProject.$inject = ['projectsAPI', 'alert', 'tools', 'router', 'jsonStorage'];
        function getCurrentProject(projectsAPI, alert, tools, router, jsonStorage) {
            var currentProjectName = tools.cookies.get("currentProjectName");
            if (!angular.isDefined(currentProjectName)) {
                alert.ErrorWriterNoCallback('app.listen', '99', 'Project is not loaded');
                router.resetRoutes();
                router.go("status");
                showErrors = false;
                return;
            }
            return projectsAPI.GetProject(currentProjectName)
                              .then(function(project) {
                                  tools.log.info(project);
                                  if (!angular.isDefined(project.model)) {
                                      alert.ErrorWriterNoCallback('app.listen', '18', "No model exists for this project.");
                                      router.go('status');
                                  }
                                  if (!angular.isDefined(project.model.prevalence)) {
                                      project.riskAssessmentName = project.name;
                                      project.model.population = jsonStorage.getItem("context", "PopulationSizes")[0].size;
                                      project.model.prevalence = 1;
                                      return projectsAPI.UpdateProject(project)
                                                        .then(function(newerProject) {
                                                            tools.log.info("updated project");
                                                            return newerProject;
                                                        }, alert.ErrorWriter('app.listen', '12', 'Error updating the project'));
                                  }
                                  else {
                                      return project;
                                  }
                              }, function(data) {
                                  if (showErrors)
                                      alert.ErrorWriterNoCallback('app.listen', '22', 'Error getting project', data);
                                  router.go("status");
                              });
        }

        /* @ngInject */
        function getMeasurementRecipe(projectsAPI, config, router, alert, tools) {
            if (config.appId !== "lexicon") {
                var currentProjectName = tools.cookies.get("currentProjectName");
                return projectsAPI.GetMeasurementRecipe(currentProjectName, currentProjectName + "_measurement")
                                  .then(function(recipe) {
                                      tools.log.info(recipe);
                                      return recipe;
                                  }, function(data) {
                                      if (showErrors)
                                          alert.ErrorWriterNoCallback('app.listen', '53', 'Error getting measurement recipe', data);
                                      router.go("status");
                                  });
            }
            else {
                return null;
            }
        }

        return [
            {
                name: 'listen',
                config: {
                    url: '/listen',
                    templateUrl: 'listen/listen.html',
                    controller: 'Listen',
                    controllerAs: 'vm',
                    title: 'Listen',
                    helpPage: 'Listen',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-music fa-lg pad-right-2 pad-top"></i><b>Listen</b>',
                        enabled: false
                    },
                    resolve: {
                        currentProject: getCurrentProject,
                        measurementRecipe: getMeasurementRecipe
                    }
                }
            }
        ];
    }
})();
/**
 * Created by mtucciarone on 15/12/2015.
 */
(function() {
    'use strict';
    appRun.$inject = ['router'];
    angular.module('app.status')
           .run(appRun);

    /* @ngInject */
    function appRun(router) {
        router.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'status',
                config: {
                    url: '/status',
                    templateUrl: 'status/status.html',
                    controller: 'Status',
                    controllerAs: 'vm',
                    title: 'Home',
                    helpPage: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-home fa-lg pad-right-2 pad-top"></i><b>Home</b>',
                        enabled: true
                    }
                }
            }
        ];
    }
})();
/**
 * Created by mtucciarone on 01/05/2015.
 */
(function() {
    StartProjectModalCtrl.$inject = ['$modalInstance', 'jsonStorage', 'alert', 'router', 'tools'];
    angular.module('app.status')
           .controller('StartProject', StartProjectModalCtrl);

    /* @ngInject */
    function StartProjectModalCtrl($modalInstance, jsonStorage, alert, router, tools) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.status";

        vm.Create = create;
        vm.cancel = cancel;

        loadPage();

        //////////////////

        function create(project) {

            var currentDate = new Date();

            var JsonProject = {
                id: currentDate.getUTCMilliseconds(),
                name: project.name,
                created: currentDate,
                files: []
            };

            jsonStorage.CreateProject(JsonProject);

            tools.log.info(JSON.stringify(JsonProject));
            tools.log.info('Added new project: ' + JsonProject.id);
            alert.SuccessWriter("created project '" + JsonProject.name + "'");
            tools.cookies.put('currentProjectName', JsonProject.name);
            router.go('add');
            $modalInstance.close();
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }

        function loadPage() {
            vm.project = {};
        }

    }
})();
/**
 * Created by mtucciarone on 23/04/2015.
 */
(function() {
    StatusCtrl.$inject = ['alert', 'router', 'jsonStorage', 'tools', 'config'];
    angular.module('app.status')
           .controller('Status', StatusCtrl);

    /* @ngInject */
    function StatusCtrl(alert, router, jsonStorage, tools, config) {
        var vm = this;
        var moduleName = vm.constructor.$$moduleName ? vm.constructor.$$moduleName : "app.status";

        vm.appId = config.appId;
        vm.HasLoaded = false;
        vm.CurrentProjectList = [];
        vm.LoadProject = loadProject;
        vm.StartProject = startProject;
        vm.DeleteProject = deleteProject;
        vm.CapitalizeString = tools.CapitalizeString;

        loadPage();

        //////////////////

        function loadPage() {
            getProjects();
            vm.HasLoaded = true;
        }

        function getProjects() {
            vm.CurrentProjectList = jsonStorage.GetProjects();
            tools.log.info(vm.CurrentProjectList);
            sortProjects();
        }

        function loadProject(project) {
            tools.cookies.put('currentProjectName', project.name);
            if (angular.isDefined(project.files) && project.files.length > 0) {
                router.go('edit');
            }
            else {
                router.go('add', true);
            }
        }

        function startProject() {
            tools.modal.open({
                templateUrl: 'status/projectmodal/startproject-modal.html',
                controller: 'StartProject',
                controllerAs: 'vm'
            });
        }

        function sortProjects() {
            vm.CurrentProjectList.sort(function(a, b) {
                return new Date(b.updated).getTime() - new Date(a.updated).getTime();
            });
        }

        function deleteProject(project, projectIndex) {
            tools.modal.open({
                templateUrl: 'layout/generic/action-modal.html',
                controller: 'ActionModal',
                controllerAs: 'vm',
                resolve: {
                    object: function() {
                        return project.name;
                    },
                    action: function() {
                        return "delete";
                    },
                    explanation: function() {
                        return "";
                    }
                }
            })
                 .result
                 .then(function(result) {
                     if (result) {
                         jsonStorage.DeleteProject(projectIndex);
                         getProjects();
                     }
                 });
        }

    }
})();