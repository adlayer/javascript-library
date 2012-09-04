/**
* Abstract class to http requests, connections and responses
*
* @class Http
* @constructor
*/
var Http = function(){
	var Core = require('../domain/core').Core;
	var queryString = require('../node_modules/querystring').querystring;
	Core.apply(this, arguments);
	
	/**
	* @property host
	* @type string
	*/
	this.host = '';
	/**
	* @property protocol
	* @type string
	* @default 'http'
	*/
	this.protocol = 'http';
	/**
	* @property port
	* @type number
	* @default 80
	*/
	this.port = 80;
	/**
	* @property path
	* @type string
	* @default '/'
	*/
	this.path = '/';
	/**
	* @property qs
	* @type object
	*/
	this.qs = {};
	/**
	* @property query
	* @type string
	*/
	this.query = '';
	/**
	* @property url
	* @type string
	*/
	this.url = '';

	/**
	* @method isEmptyObject
	* @param {Object} obj Object to verify
	* return {Boolean}
	*/
	function isEmptyObject(obj){
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) return false;
		}
		return true;
	}
	
	/**
	* @method getUrl
	* @returns {String} full url
	*/
	this.getUrl = function(){
		if( !this.url ){
			this.url = this.protocol;
			this.url += '://';
			this.url += this.host;
			this.url += this.path;
			
			if (!isEmptyObject(this.qs)){
				this.query = [this.query, queryString.stringify(this.qs)].join('&');
			}
			if (this.query){
				this.url += '?' + this.query;	
			}
			
		}
		return this.url;
	};
};
exports.Http = Http;