// Implementation of common.js
var node_modules = {};
var module = {};

module.exports = {};
var exports = module.exports;

var require = function(path){
	return exports;	
};
// Prototype pattern Object.create() in old browsers
function copy(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}
exports.copy = copy;
/**
 * Util method for extend/merge objects
 * @method merge
 */
var merge = function(destination,source) {
    for (var property in source){
		if(source.hasOwnProperty(property)){
			destination[property] = source[property];
		}
	}
    return destination;
};
exports.merge = merge;
/**
 * @method loadScript
 * @param {string}
 * @return {element}
 */
function loadScript(url, sucess, error){
    var head = document.getElementsByTagName("head")[0] || document.insertBefore(document.firstChild.firstChild,document.createElement("head"));  
    var script = document.createElement("script");	

	script.onload = sucess || undefined;
	//script.onerror = error || undefined;

    script.type = "text/javascript";
    script.src = url;

    head.appendChild(script);
    return script;
}
exports.loadscript = loadScript;
/**
* @module events
*/
var events = {};

/**
* Implementation minimized of node event emitter
*
* @class EventEmitter
* @constructor
*/
var EventEmitter = function(){
	/**
	* Storage of events
	*
	* @attribute listeners
	* @type object
	* @private
	*/
	var listeners = {
		load:[],
		click:[],
		readyStateChange:[]
	};
	
	/**
	* @method listeners
	* @param {String} event Name of event
	* @return {Array}
	*/
	this.listeners = function(event){
		return listeners[event];
	};
	
	/**
	* @method addListener
	* @param {String} event Name of event
	* @param {Function} fn Eventhandler
	* @return {Array}
	*/
	this.addListener = function(event,fn){
		if(!listeners[event]){
			listeners[event] = [];
		}
		listeners[event].push(fn);
		return listeners[event];
	};
	
	/**
	* Shortcut for addListener
	*
	* @method on
	* @param {String} event Name of event
	* @param {Function} fn Eventhandler
	* @return {Array}
	*/
	this.on = function(event, fn){
		return this.addListener(event,fn);
	};
	
	/**
	* Trigger the event
	*
	* @method emit
	* @param {String} event Name of event
	* @return {Array}
	*/
	this.emit = function(event){
		var eventListeners = listeners[event];
		if(eventListeners && (eventListeners.length > 0)){
			var i = 0;
			for(i; i < eventListeners.length; i++){
				eventListeners[i].call();
			}
			return eventListeners;
		}
	};
};
events.EventEmitter = EventEmitter;
exports.events = events;
/**
* QueryString module for handle params
* @module queryString
* @public
*/
var queryString = {
	/**
	* @method parse
	* @public 
	*/
	parse:function(qs){
		var sep = "&";
		var eq = "=";
		var obj = {};

		qs = qs.split(sep);
		for(var i = 0; i < qs.length; i++){
			var prop = qs[i];
			prop = prop.split(eq);
			var key = prop[0];
			var value = prop[1];
			
			//is number
			if(!isNaN(value)){
				value = parseInt(value,10);
			}
			
			obj[key] = value;
		}
		return obj;
	},
	/**
	* @method stringify
	* @public 
	*/
	stringify:function(obj){
		var sep = "&";
		var eq = "=";
		var list =  [];
		
		for( var param in obj ){
			if( obj[param] && typeof obj[param] !== 'function'){
				list.push(param + eq + obj[param]);
			}
		}
		return list.join(sep);
	}
};
exports.querystring = queryString;