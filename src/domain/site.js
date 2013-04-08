/**
* @module core
*/

/**
* Abstract class for site
*
* @class Site
* @constructor
* @extends Core
*/
var Site = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* Unique site id
	* @property id 
	* @type string
	*/
	this.id = '';
	/**
	* Name of site
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* true for active and  false for inactive
	* @property status
	* @type boolean
	* @default true
	*/
	this.status = true;
	/**
	* Collection of all allowed domains
	* @property domains
	* @type array
	*/
	this.domains = [];
	
	/**
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* Find for exact domain or subdomain
	*
	* @method hasDomain
	* @public
	* @param {String} entry - Domain string
	* @return {Boolean} - True when found a domain and false for not
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

	exports.Site = Site;