(function() {
    "use strict";

    var tweetSaver = angular.module("tweetSaverModule");
    tweetSaver.controller('tweetsCtrl', function($sce, $scope) {

        this.$onInit = function() {
            $scope.getTweets();

        };

        $scope.loadTweets = function() {
            $.ajax({
                url: 'http://tweetsaver.herokuapp.com/?q=' + $scope.queryInput + '&count=10',
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function(response) {
                    $scope.tweetsList = response.tweets;
                    $scope.getTweets();
                    $scope.$apply();
                },
                error: function() {
                    alert('error');
                }
            });
        }

        $scope.getTweets = function() {
            // Load saved tweets
            var savedTweetsHTML = '';
            var savedTweets = JSON.parse(localStorage.getItem('savedTweets'));
            if (savedTweets) {
                savedTweets.forEach(function(tweet) {
                    savedTweetsHTML += tweet;
                }, this);
                $scope.savedTweets = $sce.trustAsHtml(savedTweetsHTML);
            }
        }

        $scope.drag = function(event) {
            event.dataTransfer.setData("id", event.target.id);
        }

        $scope.allowDrop = function(event) {
            event.preventDefault();
        }

        $scope.drop = function(event) {
            event.preventDefault();

            var sourceID = event.dataTransfer.getData("id");
            var sourceElement = $('#' + sourceID)[0];
            var savedTweets = localStorage.getItem('savedTweets') ? JSON.parse(localStorage.getItem('savedTweets')) : [];
            var regex = new RegExp(/(id="(.*?)(\"))/g);

            savedTweets.forEach(function(tweet) {
                console.log(tweet.match(regex));
            });
            savedTweets.push(sourceElement.outerHTML);
            localStorage.setItem('savedTweets', JSON.stringify(savedTweets));
            $('.right_box')[0].appendChild(document.getElementById(sourceID));
        }
    });
}());