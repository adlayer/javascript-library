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
	* @returns {Boolean}
	*/
	JsonpRequest.prototype.setCallback = function(str, callback){
		this.qs.callback = str;
		if(callback) this.callback = callback;
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
	JsonpRequest.prototype.send = function(options){
		if(options) this.extend(options);
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
	exports.JsonpRequest = JsonpRequest;