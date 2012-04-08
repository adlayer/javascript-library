/*
* Make an http request expeting for jsonp return
*
* @class JsonpRequest
* @constructor
* @param {Object} Attributes
* @param {Function} callback
* @example new JsonpRequest({document:document, url}, callback).serCallback('root.global.callback')
*/
var JsonpRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
	
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
	* @method wrap
	* @privileged
	* @param {Object} obj
	* @returns {Function} wrapper
	*/
	this.expose = function(obj){
		var fn = this.callback;
		obj.callback = wrap(fn);
	};
};

	/*
	* @method setCallback
	* @public
	* @param {String} str callback namespace
	* @param {Function} callback
	* @returns {Object} this to chain
	*/
	JsonpRequest.prototype.setCallback = function(str, callback, obj){
		this.qs.callback = str;
		if(callback) this.callback = callback;
		if(obj) this.expose(obj);
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
		loadScript(this.getUrl(), this.document || document);
		return this;
	};

	/*
	* @method make
	* @static
	* @param {Object} options	
	* @param {Function} callback
	* @returns {DOMObject} document
	* @example: JsonpRequest.make(options, callback, document).expose(root)
	*/	
	JsonpRequest.make = function(options, callback, document){
		var instance = new JsonpRequest(options, callback);
		if(document){
			instance.document = document;
		}
		instance.send();
		return instance;
	};
	
	exports.JsonpRequest = JsonpRequest;