/**
 * Created by mtucciarone on 15/01/2016.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paModalError', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/modal-error.html',
                   scope: {
                       'alertobject': '='
                   }
               };
           });
})();