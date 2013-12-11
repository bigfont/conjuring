//app
var myApp = angular.module('conjuringApp', []);

//constants
myApp.constant('webApiConst', '/api/');

//controllers
myApp.controller('BookCtrl', ['$scope', '$http', '$window', 'webApiConst', function ($scope, $http, $window, webApiConst) {

    $scope.bookAndCompare = function (expected, actual) {
        
        var containsAll;
        var actualSplit;

        actual = actual.toLowerCase();
        expected = expected.toLowerCase();

        actualSplit = actual.split(" ");
        for (var i = 0; i < actualSplit.length; ++i)
        {
            containsAll = expected.indexOf(actualSplit[i]) >= 0;
            console.log(expected);
            console.log(actualSplit[i]);
            console.log(expected.indexOf(actualSplit[i]));
        }
        return containsAll;
    };

    $http.get(webApiConst + 'book/get').
        success(function (data, status, headers, config) {
            $scope.books = data;
        }).
        error(function (data, status, headers, config) {
            //Use this data in case of db error
            $scope.books = [{ Title: "Magic Of The World", FirstName: "John", LastName: "Mulholland" },
                             { Title: "Houdini", FirstName: "Milbourne", LastName: "Christopher" },
                             { Title: "Fun With Magic", FirstName: "Joseph", LastName: "Leeming" },
	                         { Title: "Magic Of The World", FirstName: "John", LastName: "Mulholland" },
	                         { Title: "Houdini", FirstName: "Milbourne", LastName: "Christopher" },
	                         { Title: "Fun With Magic", FirstName: "Joseph", LastName: "Leeming" },
	                         { Title: "The Encyclopedia Of Magic And Magicians", FirstName: "T. A.", LastName: "Waters" },
	                         { Title: "The Magic Of Micheal Ammar", FirstName: "Michael", LastName: "Ammar" }];
        });
}]);