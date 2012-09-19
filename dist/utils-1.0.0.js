/**
 * @private
 * Implementation of common.js
 */
var node_modules = {};
var module = {};

module.exports = {};
var exports = module.exports;

/**
 * @example
 * EventEmitter = require('events').EventEmitter;
 * No mattter what you pass parameter, this will always find for var 'exports' , bacause in this implementation
 * Everything are in the same structure
 */
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
 * Load an script on top of html
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
 * @class Event Emitter
 * @classDescription Implementation minimized of node event emitter
 */
var events = {};
var EventEmitter = function(){
	/* @private */
	var listeners = {
			load:[],
			click:[],
			readyStateChange:[]
	};
	
	this.listeners = function(event){
		return listeners[event];
	};
	
	/* @public */
	this.addListener = function(event,fn){
		if(!listeners[event]){
			listeners[event] = [];
		}
		listeners[event].push(fn);
		return listeners[event];
	};
	
	this.on = function(event, fn){
		return this.addListener(event,fn);
	};
	
	/* @public */
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
* @public
*/
var queryString = {
	/* @public */ 
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
	/* @public */
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