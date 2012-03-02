/**
* @class
*/
var Ad = function( attributes ){
	/*
	* Ad id
	* @type string
	*/
	this.id = '';
	/*
	* Name of ad creative
	* @type string
	*/
	this.name = '';
	/*
	* Id to campaign that belongs to
	* @type string
	*/
	this.campaign_id = '';
	/*
	* Ad type
	* @type string
	*/
	this.type = '';
	/*
	* Path to  ad file
	* @type string
	*/
	this.file = '';
	/*
	* Ad status
	* @type boolean
	*/
	this.status = true;
	
	/*
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