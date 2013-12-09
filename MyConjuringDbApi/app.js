var myApp = angular.module('conjuringApp', []);


myApp.controller('BookCtrl', ['$scope', '$http', function ($scope, $http) {

    var books;
    books = $http.get('http://localhost:2188/api/book/get');

}]);