/**
* Core class
*
* @class Core
* @constructor
* @requires merge
*/
var Core = function(){
	var merge = require('../utils/merge').merge;
	var queryString = require('../node_modules/querystring').querystring;
	
	/*
	* @method extend
	* @privileged
	* @returns {Object} return this to allow chain pattern
	*/
	this.extend = function(attributes){
		return merge(this, attributes);
	};
	
	this.toQuery = function(){
		return queryString.stringify(this);
	};
	
};
exports.Core = Core;