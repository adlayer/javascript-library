/**
* @module request
*/

/**
* Make an http request expeting for jsonp return
*
* @class JsonpRequest
* @constructor
* @extends HttpRequest
* @param {Object} Attributes
* @param {Function} callback
* @example new JsonpRequest({document:document, url}, callback).queryCallback('root.global.callback')
*/
var JsonpRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
};
	/**
	* @method queryCallback
	* @public
	* @param {String} string to call in jsonpresult
	* @return {Object} this to chain
	*/
	JsonpRequest.prototype.queryCallback = function(str){
		this.qs.callback = str;
		return this;
	};

	/**
	* @method validate
	* @public
	* @return {Boolean}
	*/
	JsonpRequest.prototype.validate = function(){
		return this.qs.callback !== undefined;
	};

	/**
	* @method send
	* @public
	* @param {Object} options
	* @return {Object} this to chain
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
	
	/**
	* @property document
	* @type object
	* @static
	*/
	JsonpRequest.document = undefined;
	
	/**
	* @method make
	* @static
	* @param {Object} options	
	* @param {Function} callback
	* @return {Object} this to chain
	* @example JsonpRequest.make(options, callback).expose(root)
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