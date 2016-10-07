// Karma configuration
// Generated on Thu Jun 11 2015 13:34:58 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        hostname: 'localhost',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'src/main/resources/app/thirdparty/js/vendor/modernizr.js',
            'src/main/resources/app/thirdparty/js/es5-shim/v4.5.7/es5-shim.min.js',
            'src/main/resources/app/thirdparty/js/es6-shim/v0.35.0/es6-shim.min.js',
            'src/main/resources/app/thirdparty/js/vendor/jquery-2.1.4.min.js',
            'src/main/resources/app/thirdparty/js/vendor/fastclick.js',
            'src/main/resources/app/thirdparty/js/fileSaver/FileSaver.min.js',
            'src/main/resources/app/thirdparty/js/angular/1.4.7/angular.js',
            'src/main/resources/app/thirdparty/js/angular/1.4.7/angular-mocks.js',
            'src/main/resources/app/thirdparty/js/angular/1.4.7/angular-animate.js',
            'src/main/resources/app/thirdparty/js/angular/1.4.7/angular-cookies.js',
            'src/main/resources/app/thirdparty/js/angular/1.4.7/angular-sanitize.js',
            'src/main/resources/app/thirdparty/js/ui-router/0.2.15/angular-ui-router.min.js',
            'src/main/resources/app/thirdparty/js/vendor/jquery.base64.js',
            'src/main/resources/app/thirdparty/js/foundation/foundation.min.js',
            'src/main/resources/app/thirdparty/js/angularfoundation/mm-foundation-tpls-0.8.0.js',
            'src/main/resources/app/thirdparty/js/ng-idle/angular-idle.min.js',
            'src/main/resources/app/thirdparty/js/valdr/valdr.min.js',
            'src/main/resources/app/thirdparty/js/valdr/valdr-message.min.js',
            'src/main/resources/app/thirdparty/js/smart-table/2.1.7/smart-table.min.js',
            'bin/tmp/app/app.js',
            'src/main/resources/app/thirdparty/js/angular-http-auth-master/src/http-auth-interceptor.js',
            'src/main/resources/app/blocks/**/*.spec.js',
            'src/main/resources/app/core/**/*.spec.js',
            'src/main/resources/app/add/**/*.spec.js',
            'src/main/resources/app/edit/**/*.spec.js',
            'src/main/resources/app/listen/**/*.spec.js',
            'src/main/resources/app/directives/**/*.spec.js',
            'src/main/resources/app/filters/**/*.spec.js',
            'src/main/resources/app/layout/**/*.spec.js',
            'src/main/resources/app/status/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        //preprocessors: {
        //    'src/main/resources/app/blocks/*/*.js': ['coverage'],
        //},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // add plugin settings
        coverageReporter: {
            type: 'html', dir: 'bin/coverage/'
        },

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        // web server port
        port: 9870,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        browserNoActivityTimeout: 60000,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Firefox', 'IE'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
