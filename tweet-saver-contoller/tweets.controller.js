(function() {
    "use strict";

    var tweetSaver = angular.module("tweetSaverModule");
    tweetSaver.controller('tweetsCtrl', function($scope) {
        this.$onInit = function() {
            $(function() {
                $("#sortable1, #sortable2").sortable({
                    connectWith: ".connectedSortable"
                }).disableSelection();
            });
        };

        $scope.loadTweets = function() {
            $.ajax({
                url: 'http://tweetsaver.herokuapp.com/?q=' + $scope.queryInput + '&count=2',
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                success: function(response) {
                    $scope.tweetsList = response.tweets;
                    $scope.$apply();
                },
                error: function() {
                    alert('error');
                }
            });
        }
    });
}());