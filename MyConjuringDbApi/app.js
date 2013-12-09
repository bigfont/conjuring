var myApp = angular.module('conjuringApp', []);

myApp.controller('BookCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $http.get('localhost/api/book/get')
        .success(function (data, status, headers, config) {
            $scope.books = data;
        })
        .error(function (data, status, headers, config) {
            // oops :-(
        });
}]);