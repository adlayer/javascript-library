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
* @description Find for exact domain or subdomain
* @todo: change to regex
* @returns {Boolean} - True when found a domain and false for not
*/
Site.prototype.hasDomain = function(entry){
	var self = this;
	var result = false;
	
	function found(content, context){
		return context.indexOf(content) !== -1;
	};
	
	function removeSubdomain(entry){
		var parts = entry.split('.');
		var lastPart = parts.length;
		return parts.slice(1, lastPart).join('.');
	};
	
	// Found exact domain ?
	if( found(entry, this.domains ) ){
		result = true;
	} else {
		// Run in all domains
		this.domains.forEach(function(domain){
			// Current domain is a wildcard ?
			var wildcard = found('*', domain);
			if( wildcard ){
				entry = removeSubdomain(entry);
				if( found(entry, domain) ) result = true;
			}
		});
	}
	return result;
};

/**
* @requires modules in browser
* @exports Event as Event
*/
exports.Site = Site;