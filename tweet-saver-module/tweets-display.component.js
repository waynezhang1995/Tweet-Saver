(function() {
    "use strict";

    var tweetSaver = angular.module("tweetSaverModule");

    var tweetsDisplay = tweetSaver.component("tweetsDisplay", {
        templateUrl: "tweet-saver-module/tweets-display.component.html",
        bindings: {},
        controllerAs: "model",
        controller: function() {
            var model = this;

            model.$onInit = function() {

            }

            model.$onChange = function() {

            }
        }
    });

}());