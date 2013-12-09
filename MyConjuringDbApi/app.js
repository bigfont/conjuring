var myApp = angular.module('conjuringApp', []);


myApp.controller('BookCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $http.get('http://conjuring.azurewebsites.net/api/book/get')
        .success(function (data, status, headers, config) {
            
            $window.alert('success');

        })
        .error(function (data, status, headers, config) {
            $window.alert('error');

        });    
}]);