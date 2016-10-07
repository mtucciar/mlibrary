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