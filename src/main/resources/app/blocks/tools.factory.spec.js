/**
 * Created by mtucciarone on 19/04/2016.
 */
describe('Tools Factory: ', function() {
    var tools;
    var emptyArray = [];
    var integerArray = [1, 2, 3, 4];
    var objectArray = [{name: "theName1", id: 1}, {name: "theName2", id: 2}];

    beforeEach(module('blocks.tools', function($provide) {
        $provide.value('$timeout', {});
        $provide.value('$window', {});
        $provide.value('$interval', {});
        $provide.value('$location', {});
        $provide.value('$cookies', {});
        $provide.value('$modal', {});
        $provide.value('$filter', {});
        $provide.value('$q', {});
    }));

    beforeEach(inject(function(_tools_) {
        tools = _tools_;
    }));

    it('Should ensure tools was injected', function() {
        expect(tools)
            .not
            .toBe(undefined);
    });

    it('Should return true for a value being in an array', function() {
        var needle = 2;
        expect(tools.InArray(needle, integerArray))
            .toBeTruthy();
    });

    it('Should return false for a value being in an array', function() {
        var needle = 5;
        expect(tools.InArray(needle, integerArray))
            .toBeFalsy();
    });

    it('Should return false for null being in an array', function() {
        var needle = null;
        expect(tools.InArray(needle, integerArray))
            .toBeFalsy();
    });

    it('Should return false for null being in an empty array', function() {
        var needle = null;
        expect(tools.InArray(needle, emptyArray))
            .toBeFalsy();
    });

    it('Should return an element whose id is equal to 1', function() {
        var element1 = {name: "theName1", id: 1};
        expect(tools.ExtractElement(objectArray, 'id', 1))
            .toEqual(element1);
    });

    it('Should return null when no element is found', function() {
        expect(tools.ExtractElement(objectArray, 'id', 3))
            .toEqual(null);
    });

    it('Should return null when the property is not defined in the objects of the array', function() {
        expect(tools.ExtractElement(objectArray, 'index', 1))
            .toEqual(null);
    });

    it('Should return null when the array is empty', function() {
        expect(tools.ExtractElement(emptyArray, 'id', 1))
            .toEqual(null);
    });

    it('Should remove the element from array', function() {
        var element1 = {name: "theName1", id: 1};
        var element2 = {name: "theName2", id: 2};
        var newArray = angular.copy(objectArray);
        var newList = tools.RemoveElement(newArray, 1);

        expect(newList.length)
            .toEqual(1);
        expect(newList[0])
            .toEqual(element1);
        expect(newList.filter(function(item) {
            return item.name === element2.name && item.id === element2.id;
        }))
            .toEqual([]);
        expect(newList)
            .toEqual(newArray);
        expect(newList)
            .not
            .toEqual(objectArray);
    });

    it('Should reduce the size of the array from 4 to 2 starting from position 1', function() {
        var newArray = angular.copy(objectArray);
        newArray.push({name: 'theName3', id: 3});
        newArray.push({name: 'theName4', id: 4});
        var newList = tools.Subset(newArray, 1, 2);

        expect(newList.length)
            .toEqual(2);

        expect(newList[0])
            .toEqual({name: 'theName2', id: 2});
        expect(newList[1])
            .toEqual({name: 'theName3', id: 3});
    });

    it('Should return empty starting from position 4 which is not in the array', function() {
        var newArray = angular.copy(objectArray);
        newArray.push({name: 'theName3', id: 3});
        newArray.push({name: 'theName4', id: 4});
        var newList = tools.Subset(newArray, 4, 1);

        expect(newList.length)
            .toEqual(0);
    });

    it('Should return last element in the array', function() {
        var newArray = angular.copy(objectArray);
        newArray.push({name: 'theName3', id: 3});
        newArray.push({name: 'theName4', id: 4});
        var newList = tools.Subset(newArray, 3, 1);

        expect(newList.length)
            .toEqual(1);
        expect(newList[0])
            .toEqual({name: 'theName4', id: 4});
    });

    it('Should return the second 2 elements based on a page size of 2 and page 2', function() {
        var newArray = angular.copy(objectArray);
        newArray.push({name: 'theName3', id: 3});
        newArray.push({name: 'theName4', id: 4});
        newArray.push({name: 'theName4', id: 5});
        newArray.push({name: 'theName4', id: 6});
        var newList = tools.GetPage(newArray, 2, 2);

        expect(newList.length)
            .toEqual(2);
        expect(newList[0])
            .toEqual({name: 'theName3', id: 3});
        expect(newList[1])
            .toEqual({name: 'theName4', id: 4});
    });

    it('Should return the last element based on a page size of 4 and page 2', function() {
        var newArray = angular.copy(objectArray);
        newArray.push({name: 'theName3', id: 3});
        newArray.push({name: 'theName4', id: 4});
        newArray.push({name: 'theName4', id: 5});
        newArray.push({name: 'theName4', id: 6});
        var newList = tools.GetPage(newArray, 5, 2);

        expect(newList.length)
            .toEqual(1);
        expect(newList[0])
            .toEqual({name: 'theName4', id: 6});
    });

    it('Should return an empty array based on a page size equal to the array size and page 2', function() {
        var newArray = angular.copy(objectArray);
        newArray.push({name: 'theName3', id: 3});
        newArray.push({name: 'theName4', id: 4});
        newArray.push({name: 'theName4', id: 5});
        newArray.push({name: 'theName4', id: 6});
        var newList = tools.GetPage(newArray, 6, 2);

        expect(newList.length)
            .toEqual(0);
    });

    it('Should catch all four of an object that does not exist and one that does', function() {
        var notDefined;
        var nullDefined = null;
        var definedObject = {};
        var emptyString = "";

        expect(tools.Exists(notDefined))
            .toBeFalsy();
        expect(tools.Exists(nullDefined))
            .toBeFalsy();
        expect(tools.Exists(emptyString))
            .toBeFalsy();
        expect(tools.Exists(definedObject))
            .toBeTruthy();
    });

    it('Should return true if anything inside a string is in an array', function() {
        var myString = "This is a cool string with a q";
        var arrayOfBadCharacters = ["q", "z", "y", "w"];

        expect(tools.ContainsAnyOf(myString, arrayOfBadCharacters))
            .toBeTruthy();
    });

    it('Should return false if anything inside a string is not in an array', function() {
        var myString = "This is a cool string";
        var arrayOfBadCharacters = ["q", "z", "y", "w"];

        expect(tools.ContainsAnyOf(myString, arrayOfBadCharacters))
            .toBeFalsy();
        expect(tools.ContainsAnyOf(myString, emptyArray))
            .toBeFalsy();
        expect(tools.ContainsAnyOf("", emptyArray))
            .toBeFalsy();
        expect(tools.ContainsAnyOf("", arrayOfBadCharacters))
            .toBeFalsy();
    });

    it('Should capitalize the first letter of the input word', function() {
        var myString = "my string";

        expect(tools.CapitalizeString(myString))
            .toEqual("My string");
    });

    it('Should not capitalize the first letter of the second word', function() {
        var myString = "my string";

        expect(tools.CapitalizeString(myString))
            .toEqual("My string");
    });

    it('Should do nothing to the input string given the first character is not a letter', function() {
        var myString = "1 string";
        var myString2 = " string";

        expect(tools.CapitalizeString(myString))
            .toEqual("1 string");
        expect(tools.CapitalizeString(myString2))
            .toEqual(" string");
    });

    it('Should return false if an object has a property', function() {
        var oneProp = {id: 1};
        var nullProp = {id: null};
        
        expect(tools.IsEmptyObject(oneProp))
            .toBeFalsy();
        expect(tools.IsEmptyObject(nullProp))
            .toBeFalsy();
    });

    it('Should return true if an object has no properties', function() {
        var noProp = {};
        var nullObject = null;

        expect(tools.IsEmptyObject(noProp))
            .toBeTruthy();
        expect(tools.IsEmptyObject(nullObject))
            .toBeTruthy();
    });

});