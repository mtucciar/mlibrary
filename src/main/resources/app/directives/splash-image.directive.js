/**
 * Created by mtucciarone on 14/12/2015.
 */
(function() {
    'use strict';
    angular.module('app.directives')
           .directive('paSplashImage', ['config', function(config) {
               return {
                   restrict: 'E',
                   templateUrl: 'directives/splash-image.html',
                   link: function(scope, elm, attrs, ctrl) {
                       scope.imgSource = "content/images/splash.png";
                   }
               };
           }]);
})();