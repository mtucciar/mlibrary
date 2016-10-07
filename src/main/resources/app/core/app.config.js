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