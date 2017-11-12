(function(){
"use strict";

var tweetSaver = angular.module("tweetSaverModule");

var saver = tweetSaver.component("saver", {
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