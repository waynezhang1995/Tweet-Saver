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

            }

            model.$onChange = function() {

            }
        }
    });

}());