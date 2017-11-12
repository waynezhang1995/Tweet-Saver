(function(){
"use strict";

var tweetSaver = angular.module("tweetSaverModule");

var tweetsDisplay = tweetSaver.component("tweetsDisplay", {
	templateUrl: "",
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

}();)