// Implementation of common.js 1.1
if(!module){
	var node_modules = {};
	var module = {};

	module.exports = {};
	var exports = module.exports;

	var require = function(path){
		return exports;	
	};	
}