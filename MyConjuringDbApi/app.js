var myApp = angular.module('conjuringApp', []);

myApp.constant('webApiConst', '/api/');




myApp.controller('BookCtrl', ['$scope', '$http', '$window', 'webApiConst', function ($scope, $http, $window, webApiConst) {
    $http.get(webApiConst + 'book/get')
        .success(function (data, status, headers, config) {
            $scope.books = data;
        })
        .error(function (data, status, headers, config) {
            // oops :-(
        });
}]);