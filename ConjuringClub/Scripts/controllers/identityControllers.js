var identityModule = angular.module("identityModule", []);

//
// Test user registration. 
//
identityModule.controller('RegisterCtrl', ['$scope', '$http', function ($scope, $http) {

    $http({ method: 'POST', url: 'api/account/register', data: { UserName: 'Alice', Password: 'password123', ConfirmPassword: 'password123' } }).
        success(function (data, status, headers, config) {

            $scope.result = "success";

        }).
        error(function (data, status, headers, config) {

            $scope.result = "error";

        });

}]);

identityModule.controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {

    function loginWithAspNetIdentity(username, password) {
        $http({ method: 'POST', url: 'token', data: "grant_type=password&username=" + username + "&password=" + password }).
            success(function (data, status, headers, config) {

                var access_token,
                    token_type,
                    expires_in,
                    userName,
                    _issued,
                    _expires,
                    storage;

                access_token = data.access_token;
                token_type = data.token_type;
                expires_in = data.expires_in;
                userName = data.userName;
                _issued = data[".issued"];
                _expired = data[".expires"];

                if ($scope.rememberMe === true) {
                    storage = localStorage;
                }
                else {
                    storage = sessionStorage;
                }

                storage.setItem("access_token", access_token);
                storage.setItem("token_type", token_type);
                storage.setItem("expires_in", expires_in);
                storage.setItem("userName", userName);
                storage.setItem("_issued", _issued);
                storage.setItem("_expires", _expires);

                $scope.result = data;

            }).
            error(function (data, status, headers, config) {

                $scope.result = data;

            });
    }

    $scope.login = function () {
        loginWithAspNetIdentity($scope.username, $scope.password);
    }

}]);
