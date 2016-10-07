/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paHeader', function() {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/header.html',
                   transclude: true,
                   scope: {
                       'home': '&logoClick'
                   }
               };
           });
})();