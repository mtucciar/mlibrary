/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paProgressbar', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/progressbar.html',
                   transclude: true,
                   scope: {
                       barValue: '=',
                       displayValue: '='
                   }
               };
           });
})();