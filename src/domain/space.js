/**
* Abstract class for spaces
*
* @class Space
* @todo:
* *static create()
* *public getAd()
*/
var Space = function( attributes ){
	/*
	* Unique page id
	* @type string
	*/
	this.id = '';
	/*
	* Space type
	* @type string
	*/
	this.type = '';
	/*
	* Space status - true for active and false for inactive
	* @type boolean
	*/
	this.status = '';
	/*
	* Collection of ads linked to space
	* @type array
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