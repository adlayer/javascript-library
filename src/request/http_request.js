/**
* @module request
*/

/**
* Abstract class to make http requests
*
* @class HttpRequest
* @constructor
* @param {Object} attributes
* @param {Function} callback
*/
var HttpRequest = function( attributes, callback ){
	var Http = require('./http').Http;
	Http.apply(this, arguments);
	
	/**
	* @property callback
	* @type function
	*/
	this.callback = undefined;
	
	/**
	* @method __construct
	* @private
	* @return {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		if( typeof attributes === 'string' ){
			self.url = attributes;
		} else {
			self = self.extend(attributes);
		}
		// set callback
		self.callback = callback || self.callback;
	}(this);
};
exports.HttpRequest = HttpRequest;