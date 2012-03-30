/*
* Abstract class for site
*
* @class Site
* @constructor
* @param {Object} attributes
*/
var Site = function( attributes ){
	/**
	* @property {String} id Unique site id
	*/
	this.id = '';
	/**
	* @property {String} name Name of site
	*/
	this.name = '';
	/**
	* @property {Boolean} status true for active and  false for inactive
	*/
	this.status = true;
	/**
	* @property {Array} domains Collection of all allowed domains
	*/
	this.domains = [];
	
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
	* @description Find for exact domain or subdomain
	* @public
	* @param {String} entry - Domain string
	* @returns {Boolean} - True when found a domain and false for not
	* @todo: change to regex
	*/
	Site.prototype.hasDomain = function(entry){
		var self = this;
		var result = false;

		function found(content, context){
			return context.indexOf(content) !== -1;
		}
	
		// Found exact domain ?
		if( found(entry, this.domains ) ){
			result = true;
		} else {
			// Run in all domains
			this.domains.forEach(function(domain){
				// Current domain is a wildcard ?
				var wildcard = found('*', domain);
				if( wildcard ){
					// Remove star
					domain = domain.replace('*', '');
					if( found(domain, entry) ) result = true;
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