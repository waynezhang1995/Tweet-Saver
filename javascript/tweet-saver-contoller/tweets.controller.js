(function() {
    "use strict";

    var tweetSaver = angular.module("tweetSaverModule");
    tweetSaver.controller('tweetsCtrl', function($sce, $scope) {

        /**
         * Get saved tweets from localstorage
         * bind enter key linstener
         */
        this.$onInit = function() {
            $scope.getTweets();
            $scope.bindEnterKeyPress();
        };

        /**
         * Search tweets using jquery ajax
         */
        $scope.loadTweets = function() {
            $.ajax({
                url: 'http://tweetsaver.herokuapp.com/?q=' + $scope.queryInput + '&count=10',
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function(response) {
                    $scope.tweetsList = response.tweets; // Pass result tweets to view
                    $scope.getTweets(); // Display saved tweets
                    $scope.$apply(); // Update the view
                },
                error: function(response) {
                    console.log(response);
                }
            });
        }

        /**
         * Load saved tweets from localstorage
         */
        $scope.getTweets = function() {
            var savedTweetsHTML = '';
            var savedTweets = JSON.parse(localStorage.getItem('savedTweets')); // Convert the list of saved tweets to js object
            if (savedTweets) { // Check if there is any saved tweets
                savedTweets.forEach(function(tweet) { // Append to html string
                    savedTweetsHTML += tweet;
                }, this);
                $scope.savedTweets = $sce.trustAsHtml(savedTweetsHTML); // Pass to view as DOM object
            }
        }

        /**
         * Bind enter key press handler
         * Load search results once enter key is pressed by users
         */
        $scope.bindEnterKeyPress = function() {
            $('.custom-search-input input').keydown(function(e) { // Detect entry within input box
                if (e.keyCode == 13) { // Check if the enter key is pressed
                    $scope.loadTweets(); // Search for queried tweets
                }
            })
        }

        /**
         * Erase saved tweets in localstorage
         * Clear the view
         */
        $scope.clearSavedTweets = function() {
            localStorage.clear();
            $('.right-box ul').empty();
        }

        /**
         * Drap event handler
         * Sets the data type and the value of the dragged element (<li>)
         */
        $scope.drag = function(event) {
            event.dataTransfer.setData("text", event.target.id);
        }

        /**
         * Allow drop in other elements
         */
        $scope.allowDrop = function(event) {
            event.preventDefault(); // Allow drop
        }

        /**
         * Drop handler
         */
        $scope.drop = function(event) {
            event.preventDefault(); // Prevent default drop action (open link)

            var sourceID = event.dataTransfer.getData("text"); // Get the id of dragged element
            var sourceElement = $('#' + sourceID)[0]; // Get DOM element (<li>) by ID
            // Get the list of saved tweets from localstorage
            // Create a new list if there isnt any saved tweets
            var savedTweets = localStorage.getItem('savedTweets') ? JSON.parse(localStorage.getItem('savedTweets')) : [];

            /**
             * Check if selected tweet had already been saved
             * Use simple for loop instaed of forEach since we need to
             * teminate this function immediatelly
             */
            for (var i = 0; i < savedTweets.length; i++) {
                if ($.parseHTML(savedTweets[i])[0].id === sourceID) {
                    return; // Terminate function
                }
            }

            // Check drop location
            if (savedTweets.length === 0) {
                $('.right-box ul')[0].appendChild($('#' + sourceID)[0]); // First
            } else {
                $('.right-box ul')[0].insertBefore($('#' + sourceID)[0], $('.right-box ul')[0].firstChild); // Last
            }

            savedTweets.push(sourceElement.outerHTML); // Add to saved tweets list
            localStorage.setItem('savedTweets', JSON.stringify(savedTweets)); // Store to localstorage
        }
    });
}());