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
