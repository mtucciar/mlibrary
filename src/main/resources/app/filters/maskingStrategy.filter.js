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