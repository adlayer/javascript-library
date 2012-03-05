/*
* @class
*/
var Site = function( attributes ){
	/*
	* Unique site id
	* @type string
	*/
	this.id = '';
	/*
	* Site name
	* @type string
	*/
	this.name = '';
	/*
	* Site status - true for active and  false for inactive
	* @type boolean
	*/
	this.status = true;
	/*
	* Collection of all allowed domains
	* @type array
	*/
	this.domains = [];
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
* @public
* @returns {Boolean} - True when found a domain and false for not
*/
Site.prototype.hasDomain = function(domain){
	if( this.domains.indexOf(domain) === -1 ){
		return false;
	}
	return true;
};
/**
* @requires modules in browser
* @exports Event as Event
*/
exports.Site = Site;