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
	
	this.host = '';
	this.protocol = 'http';
	this.port = 80;
	this.path = '/';
	this.qs = {};
	this.query = '';
	this.url = '';

	function isEmptyObject(obj){
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) return false;
		}
		return true;
	}
	
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
/*
* Loads an img
*
* @class ImgRequest
* @constructor
* @param {Object} Attributes
* @param {Function} callback
* @example new ImgRequest({document:document, url}, callback)
*/
var ImgRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
};

	/*
	* @method send
	* @public
	* @param {Object} data
	* @returns {Object} this to chain
	*/
	ImgRequest.prototype.send = function(data){
		//todo: use merge to data-> query
		if(data) this.qs = data;
		
		// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
		var document = this.document || document;
		var img = document.createElement('img');
		img.src = this.getUrl();
		if( this.callback ){
			img.onload = this.callback.apply({ok:true});
		}
		return this;
	};
	
	/*
	* @method make
	* @static
	* @param {Object} options	
	* @param {Function} callback
	* @returns {DOMObject} document
	*/
	ImgRequest.make = function(options, callback, document){
		var instance = new ImgRequest(options, callback);
		if(document){
			instance.document = document;
		}
		instance.send();
		return instance;
	};
	
	exports.ImgRequest = ImgRequest;
/*
* Make an http request expeting for jsonp return
*
* @class JsonpRequest
* @constructor
* @param {Object} Attributes
* @param {Function} callback
* @example new JsonpRequest({document:document, url}, callback).queryCallback('root.global.callback')
*/
var JsonpRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
};
	/*
	* @method queryCallback
	* @public
	* @param {String} string to call in jsonpresult
	* @returns {Object} this to chain
	*/
	JsonpRequest.prototype.queryCallback = function(str){
		this.qs.callback = str;
		return this;
	};

	/*
	* @method validate
	* @public
	* @returns {Boolean}
	*/
	JsonpRequest.prototype.validate = function(){
		return this.qs.callback !== undefined;
	};

	/*
	* @method send
	* @public
	* @param {Object} options
	* @returns {Object} this to chain
	*/
	JsonpRequest.prototype.send = function(data){
		//todo: use merge to data-> query
		if(data) this.qs = data;
		// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
		function loadScript(url, document){
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
			return script;
		}
		loadScript(this.getUrl(), JsonpRequest.document || document);
		return this;
	};
	
	/*
	* @property {Object} DomObject
	* @static
	*/
	JsonpRequest.document = undefined;
	
	/*
	* @method make
	* @static
	* @param {Object} options	
	* @param {Function} callback
	* @returns {Object} this to chain
	* @example: JsonpRequest.make(options, callback).expose(root)
	*/	
	JsonpRequest.make = function(options, callback){
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
		var instance = new JsonpRequest(options, wrap(callback));
		instance.send();
		return instance;
	};
	
	exports.JsonpRequest = JsonpRequest;
function request(){
	
	var JsonpRequest = require('./jsonp_request').JsonpRequest;
	var ImgRequest = require('./img_request').ImgRequest;
	
	return {
		jsonp: JsonpRequest.make,
		get: JsonpRequest.make,
		img: ImgRequest.make
	};
}
exports.request = request;