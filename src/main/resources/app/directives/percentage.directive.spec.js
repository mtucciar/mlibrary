/**
 * Created by kanam on 27/01/2016.
 */

describe('Percentage directive: ', function() {

    beforeEach(module('app.directives'));

    describe('Test specs: ', function() {

        var $compile;
        var $scope;

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        }));

        it('Should get the directive: ', function() {
            expect($compile).not.toBe(undefined);
            expect($scope).not.toBe(undefined);
        });

        it('Test: ', function() {
            var theValue = 199;
            var element = angular.element("<input ng-model='theValue' name='theValue' percentage />");
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            //console.log(element);
            //console.log(compiledElement);
            //console.log($scope);

        });
    });
});