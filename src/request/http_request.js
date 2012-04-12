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
	
	this.callback = undefined;
	
	/*
	* @method wrap
	* @private
	* @param {Function} fn
	* @returns {Function} wrapper
	*/
	function wrap(fn){
		function wrapper(data){
			if( data ) {
				fn(null, data);
			} else {
				fn(new Error('No Response'), null);
			}
		}
		return wrapper;
	}
	
	/*
	* @method expose
	* @privileged
	* @param {Object} obj
	* @returns {Function} wrapper
	*/
	this.expose = function(obj){
		var fn = this.callback;
		obj.callback = wrap(fn);
	};	
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
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