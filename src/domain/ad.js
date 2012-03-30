/**
* Abstract class for ads
*
* @class Ad
* @constructor
* @param {Object} attributes
*/
var Ad = function( attributes ){
	/*
	* @property {String} id Id of ad
	* @public
	*/
	this.id = '';
	/*
	* @property {String} name Name of ad creative
	* @public
	*/
	this.name = '';
	/*
	* @property {String} campaign_id Id to campaign that belongs to
	* @public
	*/
	this.campaign_id = '';
	/*
	* @property {String} type Ad type
	* @public
	*/
	this.type = '';
	/*
	* @property {String} file Path to ad file
	* @public
	*/
	this.file = '';
	/*
	* @property {String} link destiny link
	* @public
	*/
	this.link = '';
	/*
	* @property {Boolean} status Ad status
	* @public
	*/
	this.status = true;
	/*
	* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
	* @public
	*/
	this.alternative = {};
	

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
* @requires modules in browser
* @exports Ad as Ad
*/
exports.Ad = Ad;