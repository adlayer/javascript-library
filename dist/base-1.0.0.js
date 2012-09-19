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
exports.config = {
	url: {
		adserver: {
			host: 'dev.jocasta.adlayerapp.com'
		},
		tracker: {
			host: 'dev.tracker.adlayerapp.com'
		}
	},
	page: {
		autoRun: true,
		scriptTagId: 'adlayerScript'
	}
};
/**
* Core class
*
* @class Core
* @constructor
* @requires merge
*/
var Core = function(){
	var merge = require('../utils/merge').merge;
	var queryString = require('../node_modules/querystring').querystring;
	
	/*
	* @method extend
	* @privileged
	* @returns {Object} return this to allow chain pattern
	*/
	this.extend = function(attributes){
		return merge(this, attributes);
	};
	
};
exports.Core = Core;
/**
* Create any event
*
* @class Event
* @constructor
* @param {Object} attributes
*/
var Event = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	
	/*
	* @property {Object} __date__ Instance of current date
	* @private
	*/
	var date = new Date();
	
	/*
	* @property {String} type Event type
	* @public
	*/
	this.type = '';
	
	
	/*
	* @property {String} campaign_id Campaign Id
	* @public
	*/
	this.campaign_id = '';
	/*
	* @property {String} ad_id Ad id
	* @public
	*/
	this.ad_id = '';
	/*
	* @property {String} space_id Space id
	* @public
	*/
	this.space_id = '';
	/*
	* @property {String} site_id Site id
	* @public
	*/
	this.site_id = '';
	/*
	* @property {String} page_url Url of the current page
	* @public
	*/
	this.page_url = '';
	
	
	/*
	* @property {String} date Date ISO 8601 format
	* @public
	*/
	this.date = '';
	/*
	* @property {String} time Time of event
	* @public
	*/
	this.time = '';
	/*
	* @property {String} hour
	* @description First part of a time iso
	* @public
	*/
	this.hour = '';
	
	
	/*
	* @property {String} ip Visitor ip
	* @public
	*/
	this.ip = '';
	/*
	* @property {String} browser User agent or browser
	* @public
	*/
	this.browser = '';
	
	/**
	* @method getFullDate
	* @privileged
	* @returns {String} Even if date is not converted to string return ISOString
	*/
	this.getFullDate = function(){
		if( typeof date === 'object' ){
			date = date.toISOString();
			return date;
		}
		return date;
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/*
	* @property {Array} required List of all required attributes
	* @static
	*/
	Event.required = [
		'type',
		'campaign_id',
		'space_id',
		'page_url',
		'page_id'
	];
	/*
	* @method track
	* @static
	* @returns {Object} return the result of method save
	*/
	Event.track = function(attributes){
		return new Event(attributes).save();
	};

	/*
	* @method getDate
	* @public
	* @returns {String} The second part of a fulldate splited in T character
	*/
	Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};


	/*
	* @method getTime
	* @public
	* @returns {String} he second part of a fulldate splited in T character
	*/
	Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};

	/*
	* @method getHour
	* @public
	* @returns {String || Boolean} String of hour or false
	*/
	Event.prototype.getHour = function(){
		if( this.time ){
			return this.time.split(':')[0];
		}
		return false;
	};
	/*
	* @method validate
	* @public
	* @returns {Boolean} true for all attributes and false if any is missing
	*/
	Event.prototype.validate = function(){
		for( var i = 0; i < Event.required.length; i++ ){
			var attr = Event.required[i];
			if( !this[attr] ){
				return false;
			}	
		}
		// default
		return true;
	};
	/*
	* @method toQuery
	* @public
	* @returns {String} convert object to network string
	*/
	Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
	/*
	* @method save
	* @public
	* @returns {Error} convert object to network string
	*/
	Event.prototype.save = function(){
		throw new Error('You should override this');
	};
	/**
	* @requires modules in browser
	* @exports Event as Event
	*/
	exports.Event = Event;
/**
* Abstract class for ads
*
* @class Ad
* @constructor
* @param {Object} attributes
*/
var Ad = function( attributes ){
	var Core = require('./core').Core;
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	Core.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	
	/*
	* @property {String} id Id of ad
	* @public
	*/
	this.id = '';
	/*
	* @property {String} name Name of ad creative
	* @public
	*/
	this.name = '';
	/*
	* @property {String} campaign_id Id to campaign that belongs to
	* @public
	*/
	this.campaign_id = '';
	/*
	* @property {String} type Ad type
	* @public
	*/
	this.type = '';
	/*
	* @property {String} file Path to ad file
	* @public
	*/
	this.file = '';
	/*
	* @property {String} link destiny link
	* @public
	*/
	this.link = '';
	/*
	* @property {Boolean} status Ad status
	* @public
	*/
	this.status = true;
	/*
	* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
	* @public
	*/
	this.alternative = {};
	

	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

/**
* @requires modules in browser
* @exports Ad as Ad
*/
exports.Ad = Ad;
/**
* Interface for space behaviour
*
* @interface ISpaceBehaviour
* @constructor
*/
var ISpaceBehaviour = function(){
	this.getAd = function(context){ throw new Error('Implement it'); };
};
exports.ISpaceBehaviour = ISpaceBehaviour;

/**
* Random behaviour for spaces
*
* @class RandomBehaviour
* @constructor
*/
var RandomSpaceBehaviour = function(){
	/**
	* @method getAd
	* @param {Space} context Expect space 'this' as argument
	* @return {Object} Ad
	*/
	this.getAd = function(context){ 
		var total = context.ads.length;
		var index = Math.floor(Math.random() * total);
		return context.ads[index];
	};
};

/**
* Abstract class for spaces
*
* @class Space
* @constructor
* @param {Object} attributes
*/
var Space = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* @property {String} id Unique space id
	*/
	this.id = '';
	/**
	* @property {String} type Type of space
	*/
	this.type = '';
	/**
	* @property {Boolean} status true for active and false for inactive
	*/
	this.status = '';
	/**
	* @property {Array} ads Collection of ads linked to space
	*/
	this.ads = [];
	
	/**
	* @property {SpaceBehaviour} behaviour a part of strategy pattern
	*/
	this.behaviour = {};

	/**
	* @method setBehaviour
	* @param {Object} behaviour 
	* @return {Object} Ad
	*/
	this.setBehaviour = function(behaviour){
		this.behaviour = behaviour;
		return this.behaviour;
	};
	
		
	/**
	* @method getAd
	* @return {Object} Ad
	*/
	this.getAd = function(){
		return this.behaviour.getAd(this);
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
		self.setBehaviour(new RandomSpaceBehaviour());
	}(this);
};

	/**
	* @requires modules in browser
	* @exports Space as Space
	*/
	exports.Space = Space;
/**
* Abstract class for page
*
* @class Page
* @constructor
* @param {Object} attributes
*/
var Page = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* @property {String} id unique page id
	*/
	this.id = '';
	/**
	* @property {String} name page name
	*/
	this.name = '';
	/**
	* @property {Array} spaces Collection of page spaces
	*/
	this.spaces = [];
	/**
	* @property {Boolean} true for active and false for inactive
	*/
	this.status = true;
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};
	/**
	* @method getActiveContent
	* @public
	* @returns {Object} new Page() - return the instance itself to improve chainability
	* @requires Javascript 1.6
	* __Warning:__ Don't use this in browser, because it can not work in old browsers
	* @todo: should be readonly not modify the object just return filtered value
	*/
	Page.prototype.getActiveContent = function(){
		if( this.spaces && this.spaces.length >= 1 ){
			// Run over and redesign every space (removing ads with status false)
			this.spaces = this.spaces.map(function(space){
				if( space.ads && space.ads.length >= 1 ){
					space.ads = space.ads.filter(function(ad){
						// If ad has status equal to false will auto removed from array
						return ad.status;
					});
				}
				// re-assign modified space to spaces collection
				return space;
			});
		}
		return this;
	};
	/**
	* @requires modules in browser
	* @exports Page as Page
	*/
	exports.Page = Page;
/*
* Abstract class for site
*
* @class Site
* @constructor
* @param {Object} attributes
*/
var Site = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* @property {String} id Unique site id
	*/
	this.id = '';
	/**
	* @property {String} name Name of site
	*/
	this.name = '';
	/**
	* @property {Boolean} status true for active and  false for inactive
	*/
	this.status = true;
	/**
	* @property {Array} domains Collection of all allowed domains
	*/
	this.domains = [];
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* @description Find for exact domain or subdomain
	* @public
	* @param {String} entry - Domain string
	* @returns {Boolean} - True when found a domain and false for not
	* @todo: change to regex
	*/
	Site.prototype.hasDomain = function(entry){
		var self = this;
		var result = false;

		function found(content, context){
			return context.indexOf(content) !== -1;
		}
	
		// Found exact domain ?
		if( found(entry, this.domains ) ){
			result = true;
		} else {
			// Run in all domains
			this.domains.forEach(function(domain){
				// Current domain is a wildcard ?
				var wildcard = found('*', domain);
				if( wildcard ){
					// Remove star
					domain = domain.replace('*', '');
					if( found(domain, entry) ) result = true;
				}
			});
		}
		return result;
	};

	/**
	* @requires modules in browser
	* @exports Event as Event
	*/
	exports.Site = Site;
/*
* Abstract class for dom/html elements 
*
* @class DomElement
* @link https://developer.mozilla.org/en/DOM/element
*/
var DomElement = function(){
	/**
	* @property {String} id Id attribute of object
	*/
	this.id = '';
	/**
	* @property {Object} element Dom element itself
	*/
	this.element = undefined;
};

	/*
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @static
	* @returns {Object} element
	*/
	DomElement.create = function(tagName, document){
		return document.createElement(tagName);
	};
	/*
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.create = function(tagName, document){
		//	file global || adlayer js module wrapper || passed document context
		document = this.document || global.document || document;
		this.element = DomElement.create(tagName, document);
		return this.element;
	};
	
	/*
	* @method setAttributes
	* @param {Object} attributes
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.setAttributes = function(attributes){
		var merge = require('../utils/merge').merge;
		merge(this.element, attributes);
	};
	
	/*
	* @method append
	* @param {Object} child
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.append = function(child){
		this.element.appendChild(child);
		return this;
	};
	/*
	* @method findParentTag
	* @param {String} tag UPPERCASE tag name
	* @public
	* @returns {Object} parentElement
	*/
	DomElement.prototype.findParentTag = function(tag){
		var parent = this.element.parentNode;
		while(parent.nodeName != tag){
			parent = parent.parentNode;
		}
		return parent;
	};
	/*
	* @method addDomEventListener
	* @param {String} type Event name like 'click', 'load', 'mouseover'
	* @param {Function} eventListener Callback for event trigger
	* @public
	* @returns {Object} return this to allow chainability
	*/
	DomElement.prototype.addDomEventListener = function(type, eventListener){
		if(typeof addEventListener === 'function'){
			this.element.addEventListener(type, eventListener, false);
		} else if(typeof attachEvent === 'function'){
			this.element.attachEvent('on' + type, eventListener);
		} else {
			this.element['on' + type] = eventListener;
		}
		return this;
	};


	exports.DomElement = DomElement;
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Ad = require('../domain/ad').Ad;
	var Event = require('../domain/event').Event;
	
	
	/*
	* Base for any type of Dom ads.
	*
	* @class AdDom
	* @augments Ad
	* @augments DomElement
	*/
	var AdDom = function(){
		// extends Ad
		Ad.apply(this, arguments);
		
		/*
		* @property {Tracke} tracker Instance of tracker
		* @public
		*/
		this.tracker = {};
	};
	// extends DomElement
	AdDom.prototype = new DomElement();
	
	
	/*
	* @public
	* @returns {String} return the id of the first parent div
	*/
	AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
	
	/*
	* @public
	* @param {String} site_id
	* @param {String} page_id
	* @param {String} page_url
	* @returns {String} the full url to track this link
	* @example http://tracker.adlayerapp.com/click/10?&campaign_id=1235&link=http://www.adlayer.com.br
	*/
	AdDom.prototype.getClickTag = function(site_id, page_id, page_url ){
		// Tracker url
		var trackerUrl = this.tracker.connection.getUrl();

		var event = new Event({
			type: 'click',
			campaign_id: this.campaign_id,
			space_id: this.getSpaceId(),
			site_id: site_id,
			page_id: page_id,
			page_url: page_url,
			link: this.link
		});

		if( event.validate() && this.link ){
			var url = [trackerUrl, 'click', this.id].join('/');
			url = url + '?' + event.toQuery();
			return url;
		}
		return false;
	};
	exports.AdDom = AdDom;
	
})();
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Space = require('../domain/space').Space;
	
	
	/*
	* Space dom
	*
	* @class SpaceDom
	* @requires DomElement
	* @requires Ad
	*/
	var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
		
		this.placements = {};
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();

	/*
	* @public
	* @param {Object} DomElement, Ad to append in element
	* @returns {Object} return this to chain methods
	*/
	SpaceDom.prototype.placeAd = function(ad){
		this.element.appendChild(ad.element);
		ad.emit('placement');
		return this;
	};
	
	/*
	* @public
	* @returns {Object} return the DomElement
	*/
	SpaceDom.prototype.getElement = function(){
		return this.document.getElementById(this.id);
	};
	
	exports.SpaceDom = SpaceDom;
})();

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
/**
* @class Connection
*/

/**
	## Using in node.js
	
	// hack request
	var request = require('request');
	request.jsonp = request.get;
	
	// Hacking lib.connection
	var connection = require('connection');
	connection.prototype.request = request;
	
	// Your code goes here	

**/

var Connection = function( attributes ){
	var Http = require('../request/http').Http;
	Http.apply(this, arguments);
	
	this._index = 0;
	
	this.name = '';
	this.requests = {};
	
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
	}(this);
};

Connection.prototype.id = function(){
	return 'n' + this._index;
};

Connection.prototype.newId = function(){
	this._index++;
	return this.id();
};
Connection.prototype.next = function(req){
	var sign = this.newId();
	this.requests[sign] = req;
};

Connection.prototype.getCallbackPath = function(){
	return [this.name, 'requests', this.id(), 'callback'].join('.');
};

Connection.prototype.request = require('../request/request').request;

Connection.prototype.get = function(path, data, callback){
	if(typeof data === 'function') {
		callback = data;
	}
	
	// get callback path and asign as callcack querystring;
	data.callback = this.getCallbackPath();
	
	this.path = path;
	this.qs = data;
	
	// Allocate request id namespace
	this.requests[this.id()] = {};
	
	// Make a get request
	this.request().get(this, callback);
	
	// Increment id for the next
	this.newId();
	
	return this;
};
exports.Connection = Connection;
/*
* @class Swf
* @property {String} align Alignment of html content.
* @property {Boolean} menu Control right click menu options (true, false).
* @property {String} quality Control quality of loaded movie ('low', 'medium', 'high').
* @property {String} scale Flash canvas mode ('noscale').
* @property {String} wmode Embed type relative to context.
* @property {String} type Default alias for 'application/x-shockwave-flash'.
* @property {String} type allowScriptAcess.
*/
var Swf = function(){
	this.align = "center";
	this.menu = false;
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	this.wmode = "transparent"; //window,opaque,transparent
	this.type = "application/x-shockwave-flash";
	this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
};
exports.Swf = Swf;
/**
* Create embedable ads
*
* @class EmbedAd
* @constructor
* @param {Object} attributes
*
* @augments AdDom
* @property {String} id Id of ad
* @property {String} name Name of ad creative
* @property {String} campaign_id Id to campaign that belongs to
* @property {String} type Ad type
* @property {String} file Path to ad file
* @property {String} link destiny link
* @property {Boolean} status Ad status
* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
*
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.src;
			
			self.setAttributes(new Swf());
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();
/**
* Create embedable ads
*
* @class EmbedAd
* @constructor
* @param {Object} attributes
*
* @augments AdDom
* @property {String} id Id of ad
* @property {String} name Name of ad creative
* @property {String} campaign_id Id to campaign that belongs to
* @property {String} type Ad type
* @property {String} file Path to ad file
* @property {String} link destiny link
* @property {Boolean} status Ad status
* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
*
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	var ObjectAd = function(){
		var superclass = this;
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
	
		var CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
		var CODEBASE = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0";
		var PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer";
		
		/** @class Param
		* <param name="wmode" value="tranparent" />
		*/
		var Param = function(name,value){
			this.name = name;
			this.value = value;
			this.element = superclass.create("param");
			this.element.setAttribute("name", this.name);
			this.element.setAttribute("value", this.value);
			return this.element;
		};
	
		var __construct = (function(self){
			self.create('OBJECT');
			self.element.src = self.src;
			
			self.element.setAttribute("data", self.src);
			self.element.setAttribute("classid", CLASSID);
			self.element.setAttribute("codebase", CODEBASE);
			
			// http://stackoverflow.com/questions/1168494/how-do-i-programmatically-set-all-objects-to-have-the-wmode-set-to-opaque
			var clone = self.element.cloneNode(true);

			clone.appendChild(new Param("movie", self.src));
			clone.appendChild(new Param("quality", self.quality));		
			clone.appendChild(new Param("src", self.src));
			clone.appendChild(new Param("menu", self.menu));
			clone.appendChild(new Param("scale", self.scale));
			clone.appendChild(new Param("allowScriptAccess", self.allowScriptAccess));
			clone.appendChild(new Param("allowNetworking", "all"));
			clone.appendChild(new Param("base", self.base));
			clone.appendChild(new Param("wmode", self.wmode));

			self.element = clone;
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	ObjectAd.prototype = new AdDom();
	exports.ObjectAd = ObjectAd;
})();
/**
 * @class ImgAd
 */
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var ImgAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('img');
			self.element.src = self.src;
			var img = self.element;
			
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			self.addDomEventListener('load', function(){
				self.emit('load');
			});
			
			if(self.link){
				// subscribe img with link
				self.create('a');
				self.element.href = self.link;
				self.append(img);
			}
		
			return self.element;
		})(this);
	};
	ImgAd.prototype = new AdDom();
	exports.ImgAd = ImgAd;
})();
/**
* @todo: switch for IE use object tag
* @todo: change write data different to avoid _id & file atribution
*/
(function(){
	var Embed = require('./embed_ad.js').EmbedAd;
	var ObjectAd = require('./object_ad.js').ObjectAd;
	var FlashAd = function(data){
		var __construct = (function(self){
			if(self.browser){
				return new ObjectAd(data);
			} else {
				return new Embed(data);
			}

		})(this);
		return __construct;
	};
	exports.FlashAd = FlashAd;
})();
/**
* @todo: switch for IE use object tag
* @todo: change write data different to avoid _id & file atribution
*/
(function(){
	
	exports.ads = (function(){
		var FlashAd = require('./flash_ad.js').EmbedAd;
		var Img = require('./img_ad.js').ImgAd;
		
		return {
			create: function(data){
				// mixin
				data.id = data._id;
				data.src = data.file;
				delete data.file;
				delete data._id;
				
				switch(data.type){
					case 'flash':
						return new FlashAd(data);
					case 'image':
						return new Img(data);
				}
			}
		};
	})();
	
})();
/**
* @class represents the type Expander space
* @extends Space
* @implements ISpace
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	var ExpandableSpace = function(){
		SpaceDom.apply(this, arguments);
		
		
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.id = self.id;
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			
			self.addDomEventListener(self.expandEvent, function(){
				self.expand();
				self.state = 'expanded';
			});
			
			self.addDomEventListener(self.retreatEvent, function(){
//				self.retract();
				self.state = 'retreated';
			});
			
		})(this);
	};
	ExpandableSpace.prototype = new SpaceDom();
	
	/**
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.clip = function(width, height){
		this.element.style.clip = "rect(0px " + width + " " + height + " 0px)";
		return this;
	};
	
	/**
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.expand = function(){
		var childAd = this.element.firstChild;
		if(childAd){
			this.clip(childAd.width, childAd.height);
			return this;
		}
	};
	
	/**
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.retract = function(){
		this.clip(this.width, this.height);
		return this;
	};
	

	exports.ExpandableSpace = ExpandableSpace;
})();
/**
* @class represents the type Floater
* @extends Space
* @implements ISpace
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	var FloaterSpace = function(){
		SpaceDom.apply(this, arguments);
		/**
		* @public
		*/
		this.close = function(){
			var space = this.element;
			space.parentNode.removeChild(space);
			delete this.element;
		};
		
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.id = self.id;
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			self.element.style.position = 'absolute';
			
			var bt = self.document.createElement('BUTTON');
			bt.innerHTML = 'x';
			self.append(bt);
			
		})(this);
	};
	FloaterSpace.prototype = new SpaceDom();
	exports.FloaterSpace = FloaterSpace;
})();
/**
* @class represents the type Static
* @extends SpaceDom
* @implements ISpace
*/
(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	
	var StaticSpace = function(){
		SpaceDom.apply(this, arguments);
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			self.element.id = self.id;
		})(this);
	};
	StaticSpace.prototype = new SpaceDom();
	
	exports.StaticSpace = StaticSpace;
})();
(function(){
	
	exports.spaces = (function(){
		var Expandable = require('./expandable_space.js').ExpandableSpace,
			Floater = require('./floater_space.js').FloaterSpace,
			Static = require('./static_space.js').StaticSpace;
		
		return {
			create: function(data){
				data.id = data._id;
				data.width = data.size.width;
				data.height = data.size.height;
				delete data._id;
				delete data.size;

				switch(data.type){
					case 'expandable':
						return new Expandable(data);
					case 'floater':
						return new Floater(data);
					case 'static':
						return new Static(data);
				}
			}
		};
	})();
	
})();
(function(){
	var copy = require('../utils/copy').copy;
	var Event = require('../domain/core').Event;
	/**
	* Responsible for make connections to tracker server
	*
	* @class Tracker
	* @constructor
	*/
	function Tracker(){
		/*
		* @property {Connection} connection instance
		* @public
		*/
		this.connection = {};
	}
	/*
	* @method track
	* @param {Object} data All data to track in an event
	* @public
	* @returns {undefined}
	*/
	Tracker.prototype.track = function(data){

		var event = new Event(data);

		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/' + event.type + '/' + event.ad_id;

		//  validate in client is necessary ? or is it just slow
		if( event.validate() ){
			opts.qs = event;
			var req = request().get(opts, function(err, data){
				console.log(data);
			});
			this.connection.next(req);
		}
	};
	exports.Tracker = Tracker;
})();
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Page = require('../domain/page').Page;
	var request = require('../request/request').request;
	var spaces = require('../spaces/spaces').spaces;
			
	var PageApi = function(){
		Page.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.connection;
	};
	
	// Page data model
	PageApi.prototype.getData = function(callback){
		var sign = this.connection.id();
		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/pages/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback',
			domain: this.domain,
			site_id: this.site_id
		};
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
		
	};
	
	// Page spaces iterator
	PageApi.prototype.scanSpaces = function(collection, callback){

		for( var i = 0; i < collection.length; i++ ){
			var space = collection[i];
			space.document = this.document;
			space = spaces.create(collection[i]);
			space.element = space.getElement();
			
			if ( space.element ){
				callback(null, space);
			} else {
				var error = {
					error: 'not found',
					id: space._id
				};
				callback(error, null);
			}
		}
	};
	
	exports.PageApi = PageApi;
})();
(function(global){
	var queryString = require('../node_modules/querystring').querystring;
	var copy = require('../utils/copy').copy;
	var Connection = require('../connection/connection').Connection;
	var Page = require('./page').PageApi;
	var Tracker = require('./tracker').Tracker;
	var defaultConfig = require('../config/config').config;
	
	// Required by Page.init
	var ads = require('../ads/ads').ads;
	
	// Extend or define Adlayer
	global.adlayer = global.adlayer || {};
	// Api Shortcut
	var api = global.adlayer;
	
	// Set config
	var config = api.config || defaultConfig;

	// Creating connections
	var connections = {
		adserver: new Connection(config.url.adserver),
		tracker: new Connection(config.url.tracker)
	};
	
	// Tracker instance
	var tracker = new Tracker();
	tracker.connection = connections.tracker;

	// Page instance
	var page = {};
	
	// Collections
	var spacesCollection = {};
	var adsCollection = {};
	
	/**
	* @static init
	*/
	function adInit(space, ad){
		// Exporting ad to api
		adsCollection[ad.id] = ad;
		
		ad.tracker = tracker;

		// Listener for 'LOAD' event
		ad.on('load', function(){
			ad.tracker.track({
				type: 'impression',
				
				site_id: config.site_id,
				domain: config.domain,
				page_url: config.page_url,
				page_id: config.page_id,
				
				ad_id: ad.id,
				campaign_id: ad.campaign_id,
				space_id: space.id
			});
		});

		// Listener for 'PLACEMENT' event
		ad.on('placement', function(){
			// Setting click tag in ad element
			var clickTag = ad.getClickTag(config.site_id, config.page_id, config.page_url);
			ad.element.href = clickTag;
		});
		return ad;
	}
	
	/**
	* @static init
	*/
	function spaceInit(space){
		spacesCollection[space.id] = space;
		// create a instance of Ad using data model provided
		var ad = ads.create(space.getAd());
		ad = adInit(space, ad);
		
		// Placing ad in space
		space.placeAd(ad);
	}


	/**
	* @static init
	*/
	Page.init = function(){
		
		var page = new Page({
			id: config.page_id,
			site_id: config.site_id,
			domain: config.domain,
			connection: connections.adserver,
			document: global.document
		});
		

		// Get all page data
		page.getData(function(err, data){
			// When we get spaces in this page
			if(data && data.spaces){
				// For each space found in document
				page.scanSpaces(data.spaces, function(err, space){
					// When find spaces
					if(!err){
						spaceInit(space);
					}
				});
			}
		});
		return page;
	};
	
	
	(function initialization(){
		var scriptTag = global.document.getElementById(config.page.scriptTagId);
		var queries = scriptTag.src.split('?')[1];
		var params = queryString.parse(queries);

		config.site_id = config.site_id || params.site;
		config.domain = config.domain || global.location.hostname;
		config.page_id = config.page_id || params.page;
		config.page_url = config.page_url || global.location.href;
		
		if(config.page.autoRun) page = Page.init();
		
	})();
	
	
	// Export page api
	api.page = page;
	// Export config
	api.config = config;
	// Export connections
	api.connections = connections;
	// Export space api
	api.spaces = spacesCollection;
	// Export Ad api
	api.ads = adsCollection;
	
})(this);