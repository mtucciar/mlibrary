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