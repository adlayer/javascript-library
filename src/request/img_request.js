/**
* @module request
*/

/**
* Loads an img
*
* @class ImgRequest
* @constructor
* @extends HttpRequest
* @param {Object} Attributes
* @param {Function} callback
* @example new ImgRequest({document:document, url}, callback)
*/
var ImgRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
};

	/**
	* @method send
	* @public
	* @param {Object} data
	* @returns {Object} this to chain
	*/
	ImgRequest.prototype.send = function(data){
		//todo: use merge to data-> query
		if(data) this.qs = data;
		
		// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
		var document = ImgRequest.document || document; 
		var img = document.createElement('img');
		img.src = this.getUrl();
		if( this.callback ){
			img.onload = this.callback.apply({ok:true});
		}
		return this;
	};
	
	/**
	* @property document
	* @type object
	* @static
	*/
	ImgRequest.document = undefined;
	
	/**
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