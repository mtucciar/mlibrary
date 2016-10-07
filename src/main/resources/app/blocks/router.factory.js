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