(function(){
"use strict";

var tweetSaver = angular.module("tweetSaverModule");

var search = tweetSaver.component("search", {
	templateUrl: "tweet-saver-module/search.component.html",
	bindings: {},
	controllerAs: "model",
	controller: function(){
		var model = this;

		model.$onInit = function(){

		}

		model.$onChange = function(){

		}
	}
});

}());