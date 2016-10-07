/**
 * Created by mtucciarone on 31/05/2016.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paInputSeparator', ['$filter', function($filter) {
               return {
                   require: 'ngModel',
                   restrict: 'A',
                   link: function(scope, elm, attrs, ctrl) {
                       ctrl.$formatters.unshift(function() {
                           return $filter('number')(ctrl.$modelValue);
                       });

                       ctrl.$parsers.unshift(function(val) {
                           var unformatted = val.replace(/[\,\.]/g, '');
                           var formatted = $filter('number')(unformatted);
                           elm.val(formatted);
                           return unformatted;
                       });
                   }
               };
           }]);
})();