/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paSpinner', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/spinner.html',
                   scope: {
                       spinText: '@'
                   }
               };
           });
})();