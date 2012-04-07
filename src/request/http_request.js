/**
* Make http requests
*
* @class HttpRequest
* @constructor
* @param {Object} attributes
* @param {Function} callback
*/
var HttpRequest = function( attributes, callback ){
	var Core = require('../domain/core').Core;
	var queryString = require('../node_modules/querystring').querystring;
	Core.apply(this, arguments);
	
	this.host = '';
	this.protocol = 'http';
	this.port = 80;
	this.path = '';
	this.qs = {};
	this.query = '';
	this.url = '';
	this.callback = undefined;

	/*
	* @method getUrl
	* @privileged
	* @returns {String} full url
	*/
	this.getUrl = function(){
		if( !this.url ){
			this.url = this.protocol;
			this.url += '://';
			this.url += this.host;
			this.url += this.path;
			if (this.qs){
				this.query += queryString.stringify(this.qs);
			}
			this.url += '?' + this.query;
		}
		return this.url;
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