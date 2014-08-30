//app
var myApp = angular.module('conjuringApp', ['identityModule', 'ui.bootstrap']);

//controllers
myApp.controller('BookCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    function createBookSearchObj(bookObj) {
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

        if (actual.length === 0) {
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

    function makeString(input) {
        if (typeof (input) !== 'string') {
            input = '' + input;
        }
        return input;
    }

    $scope.bookSearchComparitor = bookSearchComparitor;

    $http.get('/api/book/get').
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

myApp.controller('YouTubeCtrl', ['$scope', '$http', '$window', '$modal', '$log', '$sce', function ($scope, $http, $window, $modal, $log, $sce) {

    $scope.videos = [
        { "Id": "dxqZgbYE8eE", "Title": "Coming Soon" }
    ];
         
    $scope.open = function (videoId) {

        var videoUrl = "http://www.youtube.com/embed/" + videoId + "?rel=0";

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                videoUrl: function () {
                    return videoUrl;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);

myApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$sce', 'videoUrl', function ($scope, $modalInstance, $sce, videoUrl) {

    $scope.videoUrl = $sce.trustAsResourceUrl(videoUrl);

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

myApp.controller('ConductCtrl', ['$scope', function ($scope) {

    $scope.aspirations = [
        {
            Notion: 'Arrive on time',
            Example: 'If the club starts at 3:30 pm, we intend arrive within 5 minutes of 3:30 pm.'
        },
        {
            Notion: 'Finish on time',
            Example: 'If the club ends at 5 pm, we intend to be out by 5 pm.'
        },
        {
            Notion: 'Be supportive',
            Example: 'If we know how something works, we intend to say, "You performed that well" not "I know how you did that."'
        },
        {
            Notion: 'Speak cleanly',
            Example: 'If we are frustrated, we intend to say, "Wow, this is hard" not "@#$^%, this is hard."'
        },

    ];

}]);

myApp.controller('LevelCtrl', ['$scope', function ($scope) {

    $scope.level1 = [
        { Skill: 'Dealing', Standard: 'Deal 52 cards, one at a time, from a dealers grip in one minute.' },
        { Skill: 'Shuffling', Standard: 'Run 52 cards, one at a time, from an overhand shuffle grip in one minute.' },
        { Skill: 'Spreading', Standard: 'Spread the cards from the left to the right hand.' },
        { Skill: 'Cutting', Standard: 'Cut the cards in the hands from dealers grip using the specified technique.' }
    ];

}]);