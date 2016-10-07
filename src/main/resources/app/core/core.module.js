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