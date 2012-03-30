/**
* Abstract class for spaces
*
* @class Space
* @constructor
* @param {Object} attributes
*/
var Space = function( attributes ){
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
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = (function(self){
		// initiate here
		for( var attribute in attributes ){
			if( attributes.hasOwnProperty(attribute) ){
				self[attribute] = attributes[attribute];
			}
		}
		return self;
	})(this);
};

	/**
	* @method getRandomAd
	* @return {Object} Ad
	*/
	Space.prototype.getRandomAd = function(){
		var total = this.ads.length;
		var index = Math.floor(Math.random() * total);
		return this.ads[index];
	};	

	/**
	* @requires modules in browser
	* @exports Space as Space
	*/
	exports.Space = Space;