//app
var myApp = angular.module('conjuringApp', []);

//constants
myApp.constant('webApiConst', '/api/');

//controllers
myApp.controller('BookCtrl', ['$scope', '$http', '$window', 'webApiConst', function ($scope, $http, $window, webApiConst) {

    $scope.bookSearchComparitor = bookSearchComparitor;

    $http.get(webApiConst + 'book/get').
        success(function (data, status, headers, config) {
            $scope.books = data;
            $scope.search = createBookSearchObj($scope.books[0]);
        }).
        error(function (data, status, headers, config) {
            //Use this data in case of db error
            data = [
                { "Title": "Magic Of The World", "FirstName": "John", "LastName": "Mulholland", "Publisher": "Charles Scribner's Sons", "PublishYear": 1965, "PublishLocation": "New York: NY" },
                { "Title": "The Magic Of Micheal Ammar", "FirstName": "Michael", "LastName": "Ammar", "Publisher": "L&L Publishing ", "PublishYear": 1991, "PublishLocation": "Tahoma: CA" },
                { "Title": "Impossibilia", "FirstName": "John", "LastName": "Bannon", "Publisher": "L&L Publishing ", "PublishYear": 1990, "PublishLocation": "Tahoma: CA" },
                { "Title": "The Blackstone Book Of Magic And Illusion", "FirstName": "Harry", "LastName": "Blackstone", "Publisher": "New Market Press", "PublishYear": 1985, "PublishLocation": "New York: NY" },
                { "Title": "Modern Coin Magic", "FirstName": "J. B. ", "LastName": "Bobo", "Publisher": "Magic Inc", "PublishYear": 1988, "PublishLocation": "Chicago: IL" },
                { "Title": "Modern Coin Magic", "FirstName": "J. B. ", "LastName": "Bobo", "Publisher": "Dover Publications", "PublishYear": 1982, "PublishLocation": "New York: NY" },
                { "Title": "The Royal Road To Card Magic", "FirstName": "Frederick", "LastName": "Braue", "Publisher": "Faber & Faber", "PublishYear": 1975, "PublishLocation": "London: England" },
                { "Title": "Expert Card Technique", "FirstName": "Frederick", "LastName": "Braue", "Publisher": "Dover Publications", "PublishYear": 1974, "PublishLocation": "New York: NY" }];
            $scope.books = data;
            $scope.search = createBookSearchObj($scope.books[0]);
        });
}]);

function createBookSearchObj(bookObj)
{
    var searchObj;

    searchObj = {};
    for (var key in bookObj) {
        if (bookObj.hasOwnProperty(key)) {
            searchObj[key] = "";
        }
    }
}

function bookSearchComparitor(expected, actual) {

    var containsAll;
    var actualSplit;

    if (actual.length === 0)
    {
        return true;
    }

    actual = makeString(actual).toLowerCase();
    expected = makeString(expected).toLowerCase();

    actualSplit = actual.split(" ");
    for (var i = 0; i < actualSplit.length; ++i) {

        containsAll = expected.indexOf(actualSplit[i]) !== -1;

    }
    return containsAll;
};

function makeString(input)
{
    if (typeof (input) !== 'string')
    {
        input = '' + input;
    }
    return input;
}