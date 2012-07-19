/**
* Abstract class for spaces
*
* @class Space
* @constructor
* @param {Object} attributes
*/
var Space = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* @property {String} id Unique space id
	*/
	this.id = '';
	/**
	* @property {String} type Type of space
	*/
	this.type = '';
	/**
	* @property {Boolean} status true for active and false for inactive
	*/
	this.status = '';
	/**
	* @property {Array} ads Collection of ads linked to space
	*/
	this.ads = [];

	/**
	* @method getRandomAd
	* @return {Object} Ad
	*/
	this.getRandomAd = function(){
		var total = this.ads.length;
		var index = Math.floor(Math.random() * total);
		return this.ads[index];
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* @requires modules in browser
	* @exports Space as Space
	*/
	exports.Space = Space;