(function() {
    "use strict";

    var tweetSaver = angular.module("tweetSaverModule");
    tweetSaver.controller('tweetsCtrl', function($sce, $scope) {

        this.$onInit = function() {
            $scope.getTweets();
            $scope.bindEnterKeyPress();
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

        $scope.bindEnterKeyPress = function() {
            $('.custom-search-input input').keydown(function(e) {
                if (e.keyCode == 13) {
                    $scope.loadTweets();
                }
            })
        }

        $scope.clearSavedTweets = function() {
            localStorage.clear();
            $('.right-box ul').empty();
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

            /**
             * Check if selected tweet had already been saved
             * Use simple for loop instaed of forEach since we need to
             * teminate this function immediatelly
             */
            for (var i = 0; i < savedTweets.length; i++) {
                if ($.parseHTML(savedTweets[i])[0].id === sourceID) {
                    return;
                }
            }

            if (savedTweets.length === 0) {
                $('.right-box')[0].appendChild($('#' + sourceID)[0]);
            } else {
                $('.right-box ul')[0].insertBefore($('#' + sourceID)[0], $('.right-box ul')[0].firstChild);
            }

            savedTweets.push(sourceElement.outerHTML);
            localStorage.setItem('savedTweets', JSON.stringify(savedTweets));
        }
    });
}());