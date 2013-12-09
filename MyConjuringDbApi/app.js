var myApp = angular.module('conjuringApp', []);


myApp.controller('BookCtrl', ['$scope', '$http', function ($scope, $http) {
    
    var books = $http.get('http://conjuring.azurewebsites.net/api/book/get');
    $scope.books = books;

}]);