(function() {
    "use strict";

    var tweetSaver = angular.module("tweetSaverModule");

    var tweetDetail = tweetSaver.component("tweetDetail", {
        templateUrl: "tweet-saver-module/tweet-detail.component.html",
        bindings: {},
        controllerAs: "model",
        controller: function() {
            var model = this;

            model.$onInit = function() {
                $.ajax({
                    url: 'http://tweetsaver.herokuapp.com/?q=obama&callback=yourJSONPCallbackFn&count=10',
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    success: function(response) {
                        var result = JSON.parse(response);
                        console.log(result);
                    },
                    error: function() {
                        alert('error');
                    }
                });
                model.userName = "Simon";
                model.userAccount = "sbhahh";
                model.tweetDate = "2019";
                model.tweetContent = "aasda";

            }

            model.$onChange = function() {

            }
        }
    });

}());