//app
var myApp = angular.module('conjuringApp', ['identityModule', 'ui.bootstrap']);

//controllers

myApp.controller('CalendarCtrl', ['$scope', '$sce', function ($scope, $sce) {

    // date creation
    // see also: http://www.timeanddate.com/time/zone/canada/vancouver
    function createDate(date, time, offset)
    {
        var date = new Date(date.toString() + 'T' + time.toString() + offset.toString());
        console.log(date.toString());
        return date; 
    }

    function createDatePDT(date, time) {
        var offset = '-07:00';
        return createDate(date, time, offset);
    }
    
    function createDatePST(date, time) {
        var offset = '-08:00';
        return createDate(date, time, offset);
    }
    // end date creation

    $scope.events = [{
        Name: 'Party in the Park',
        StartDate: createDatePDT('2014-08-24', '12:00'),
        EndDate: createDatePDT('2014-08-24', '15:00'),
        Location: 'Centennial Park',
        Description: $sce.trustAsHtml('Salt Spring Foundation\'s annual <a href="http://www.saltspringislandfoundation.org/pdf/SSIFParty_Driftwood_final.pdf">Party in the Park</a> is an opportunity for any Conjuring Club member to perform. It\'s at your own initiative. Just show up, pick a person, and show \'em a trick.')
    }, {
        Name: 'Movie Night!',
        StartDate: createDatePDT('2014-09-12', '15:30'),
        EndDate: createDatePDT('2014-09-12', '19:00'),
        Location: 'Salt Spring Public Library Program Room',
        Description: $sce.trustAsHtml('This is a special screening of the award-winning documentary <a href="http://www.makebelievefilm.com/index.html">Make Believe</a>. We will start right after the normal Conjuring Club meeting and run until the movie ends. Members and invited guests only.')
    }, {
        Name: 'Conjuring Club Public Show!',
        StartDate: createDatePST('2014-12-12','17:00'),
        EndDate: createDatePST('2014-12-12','18:00'),
        Location: 'Salt Spring Public Library Program Room',
        Description: $sce.trustAsHtml('Our members will present their most polished magic effects to a live public audience.')
    }, {
        Name: 'Terry Fox Run',
        StartDate: createDatePDT('2014-09-21', '10:00'),
        EndDate: createDatePDT('2014-09-21', '12:00'),
        Location: 'Rainbow Road Pool',
        Description: $sce.trustAsHtml('Another performance opportunity for Conjuring Club members. Pick a person and perform a trick for \'em. We\'ll have a table.')
    }];

}]);

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

myApp.controller('OneDriveCtrl', ['$scope', '$http', '$window', '$modal', '$log', '$sce', function ($scope, $http, $window, $modal, $log, $sce) {

    // One Drive > Right Click the Document > EMBDED > Generate > Then parse the iframe src into the following:
    $scope.documents = [
         { Title: "Media & Press Consent Form", CId: "3894840904335CBB", ResId: "3894840904335CBB%211046", AuthKey: "AKI6hSnt6q_RFRI" },
         { Title: "Kit Order Form", CId: "3894840904335CBB", ResId: "3894840904335CBB%211048", AuthKey: "ALp9EuOZY8ry-2A" },
         { Title: "Press Release - 2014 Aug", CId: "3894840904335CBB", ResId: "3894840904335CBB%211049", AuthKey: "ANpwCZWjQj7D5Bc" },
         { Title: "Driftwood Article - 2014 Mar", CId: "3894840904335CBB", ResId: "3894840904335CBB%211050", AuthKey: "AET0sqbgVqpqwAM" },
         { Title: "Driftwood Article - 2013 Nov", CId: "3894840904335CBB", ResId: "3894840904335CBB%211063", AuthKey: "AC8xd_PwnaJXT5Q" },
         { Title: "Marketing Poster - 2013", CId: "3894840904335CBB", ResId: "3894840904335CBB%211103", AuthKey: "AIn-rAJSkqsgp_o" },
         { Title: "Stage Construction Plans - 2014", CId: "3894840904335CBB", ResId: "3894840904335CBB%211051", AuthKey: "AMuHay2fvcmiJVM" }
    ];

    $scope.open = function (document) {

        var url = "//onedrive.live.com/embed?" +
            "cid=" + document.CId +
            "&resid=" + document.ResId +
            "&authkey=" + document.AuthKey +
            "&em=2";

        document.iframeSrc = $sce.trustAsResourceUrl(url);

    };

}]);

myApp.controller('YouTubeCtrl', ['$scope', '$sce', function ($scope, $sce) {

    $scope.videos = [
        { Id: "4sDDW8c4_sc", Title: "Shaun does magic in the coffee shop" },
        { Id: "6esexn7Sy3c", Title: "Magic man Shaun's amazing card trick" },    
        { Id: "7A6vSAW0BEs", Title: "Dealt teaser" },
        { Id: "Ngmcu9-xRSk", Title: "Lance Burton Dove Act" }
    ];

    $scope.open = function (video) {

        var url = "//www.youtube.com/embed/" + video.Id + "?rel=0"
        video.iframeSrc = $sce.trustAsResourceUrl(url);

    };

}]);

myApp.controller("AzureVideoCtrl", ['$scope', '$sce', function ($scope, $sce) {

    $scope.videos = [
        {
            Id: "asset-9320445d-1500-80c3-6746-f1e50d7c5ead/jazz_aces_cafe.mp4?sv=2012-02-12&sr=c&si=592838ea-8c3a-4292-8400-e7b969c00026&sig=RRIbwKo3WKttzIOUJxkQfphUzMCFkAjXpoTYWpsI1oE%3D&st=2015-06-08T01%3A22%3A05Z&se=2115-05-15T01%3A22%3A05Z",
            Title: "Jazz Aces au Cafe"
        },
        {
            Id: "asset-9b20445d-1500-80c3-fcbb-f1e50d79fcfe/four_three_two_one_in_52.mp4?sv=2012-02-12&sr=c&si=0973bc78-c7c2-48a0-800b-7a45182ddb9a&sig=iQBQkeVE2DcG9qrh2rtgWGU8YcYB4kIRridv%2BgLZhs4%3D&st=2015-06-08T01%3A21%3A55Z&se=2115-05-15T01%3A21%3A55Z",
            Title: "4, 3, 2, 1in52.ca"
        }
    ];

    $scope.makeVideoSrc = function (video) {
        var url = "//bigfont.blob.core.windows.net/" + video.Id;
        return $sce.trustAsResourceUrl(url);
    }

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
