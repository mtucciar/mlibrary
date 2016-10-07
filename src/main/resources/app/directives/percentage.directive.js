/**
 * Created by mtucciarone on 15/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('percentage', function() {
               return {
                   require: 'ngModel',
                   restrict: 'A',
                   link: function(scope, elm, attrs, ctrl) {
                       ctrl.$validators.percentage = function(modelValue) {
                           return (ctrl.$isEmpty(modelValue) || (0 <= modelValue && modelValue <= 100));
                       };
                   }
               };
           });
})();