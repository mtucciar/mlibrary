/**
 * Created by mtucciarone on 11/05/2016.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('giveFocus', ['$timeout', function($timeout) {
               return {
                   restrict: 'AC',
                   link: function(_scope, _element) {
                       $timeout(function() {
                           _element[0].focus();
                       }, 50);
                   }
               };
           }]);
})();