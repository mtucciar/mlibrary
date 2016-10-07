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