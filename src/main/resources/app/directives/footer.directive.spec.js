/**
 * Created by kanam on 16/02/2016.
 */

describe('Footer directive: ', function() {

    beforeEach(module('app.directives'));

    describe('Test specs: ', function() {
        var compile;
        var scope;
        var directiveElem;

        beforeEach(inject(function($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();

            directiveElem = getCompiledElement();
        }));

        function getCompiledElement() {
            var element = angular.element('<div pa-footer></div>');
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }

        it('Should find the template: ', function() {
            console.log(directiveElem);
            // Incomplete, something not right.
        });
    });
});