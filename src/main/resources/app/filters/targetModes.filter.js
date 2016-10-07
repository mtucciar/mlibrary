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