/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paSubnav', ['$state', 'tools', function($state, tools) {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/subnav.html',
                   transclude: true,
                   scope: {
                       navItems: '='
                   },
                   link: function(scope, elm, attrs, ctrl) {
                       scope.IsCurrent = function(navItem) {
                           var current = $state.current.name.indexOf(navItem.Link) !== -1;
                           if (current)
                               navItem.Enabled = true;
                           return current;
                       };
                   }
               };
           }]);
})();