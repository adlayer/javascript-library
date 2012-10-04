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
exports.config = {
	url: {
		adserver: {
			host: 'jocasta.adlayerapp.com'
		},
		tracker: {
			host: 'tracker.adlayerapp.com'
		}
	},
	adsPerSpace: 1,
	page: {
		autoRun: true,
		scriptTagId: 'adlayerScript'
	}
};
/**
* @module core
*/

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
	
	/**
	* @method extend
	* @param {Object} attributes
	* @return {Object} return this to allow chain pattern
	*/
	
	this.extend = function(attributes){
		return merge(this, attributes);
	};
	
};
exports.Core = Core;
/**
* @module core
*/

/**
* Create any event
*
* @class Event
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Event = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	
	/**
	* Instance of current date
	* @property date
	* @type date
	* @private
	*/
	var date = new Date();
	
	/**
	* Event type
	* @property type
	* @type string
	*/
	this.type = '';
	/**
	* Campaign Id
	* @property campaign_id
	* @type string
	*/
	this.campaign_id = '';
	/**
	* @property ad_id
	* @type string
	*/
	this.ad_id = '';
	/**
	* @property space_id
	* @type string
	*/
	this.space_id = '';
	/**
	* @property {String} site_id Site id
	* @public
	*/
	this.site_id = '';
	/**
	* @property {String} page_url Url of the current page
	* @public
	*/
	this.page_url = '';
	
	
	/**
	* @property {String} date Date ISO 8601 format
	* @public
	*/
	this.date = '';
	/**
	* @property {String} time Time of event
	* @public
	*/
	this.time = '';
	/**
	* @property {String} hour
	* @description First part of a time iso
	* @public
	*/
	this.hour = '';
	
	
	/**
	* @property {String} ip Visitor ip
	* @public
	*/
	this.ip = '';
	/**
	* @property {String} browser User agent or browser
	* @public
	*/
	this.browser = '';
	
	/**
	* @method getFullDate
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

	/**
	* Required List of all required attributes
	* 
	* @property required
	* @type {Array}
	* @static
	*/
	Event.required = [
		'type',
		'campaign_id',
		'space_id',
		'page_url',
		'page_id'
	];
	/**
	* @method track
	* @static
	* @returns {Object} return the result of method save
	*/
	Event.track = function(attributes){
		return new Event(attributes).save();
	};

	/**
	* @method getDate
	* @public
	* @returns {String} The second part of a fulldate splited in T character
	*/
	Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};


	/**
	* @method getTime
	* @public
	* @returns {String} he second part of a fulldate splited in T character
	*/
	Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};

	/**
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
	/**
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
	/**
	* @method toQuery
	* @public
	* @returns {String} convert object to network string
	*/
	Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
	/**
	* @method save
	* @public
	* @returns {Error} convert object to network string
	*/
	Event.prototype.save = function(){
		throw new Error('You should override this');
	};

	exports.Event = Event;
/**
* @module core
*/

/**
* Abstract class for ads
*
* @class Ad
* @constructor
* @extends Core
*/
var Ad = function( attributes ){
	var Core = require('./core').Core;
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	Core.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	
	/**
	* Id of ad
	* @property id 
	* @type string
	*/
	this.id = '';
	/**
	* Name of ad creative
	* @property name 
	* @type string
	*/
	this.name = '';
	/**
	* Id to campaign that belongs to
	* @property campaign_id 
	* @type string
	*/
	this.campaign_id = '';
	/**
	* Ad type
	* @property type 
	* @type string
	*/
	this.type = '';
	/**
	* file Path to ad file
	* @property file 
	* @type string
	*/
	this.file = '';
	/**
	* link destiny link
	* @property link 
	* @type string
	*/
	this.link = '';
	/**
	* status Ad status
	* @property status 
	* @type boolean
	*/
	this.status = true;
	/**
	* Alternative Ad is another instance of Ad with graceful degradation
	* @property alternative 
	* @type object
	*/
	this.alternative = {};
	

	/**
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

exports.Ad = Ad;
/**
* @module core
*/

/**
* Interface for space behaviour
*
* @class ISpaceBehaviour
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
		var ads = context.ads;
		var total = ads.length;
		var index = Math.floor(Math.random() * total);
		var ad = ads[index];
		ads.splice(index, 1);
		return ad;
	};
};

/**
* Abstract class for spaces
*
* @class Space
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Space = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* Unique space id
	* @property id
	* @type string
	*/
	this.id = '';
	/**
	* Type of space
	* @property type
	* @type string
	*/
	this.type = '';
	/**
	* true for active and false for inactive
	* @property status
	* @type boolean
	*/
	this.status = '';
	/**
	* Collection of ads linked to space
	* @property ads
	* @type array
	*/
	this.ads = [];
	
	/**
	* behaviour a part of strategy pattern
	* @property behaviour 
	* @type SpaceBehaviour
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

	exports.Space = Space;
/**
* @module core
*/

/**
* Abstract class for page
*
* @class Page
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Page = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* id unique page id
	* @property  id
	* @type string
	*/
	this.id = '';
	/**
	* page name
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* Collection of page spaces
	* @property spaces
	* @type array
	*/
	this.spaces = [];
	/**
	* Collection of page spaces
	* @property status
	* @type boolean
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
	* @return {Page} the instance itself to improve chainability
	* @require Javascript 1.6
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
	exports.Page = Page;
/**
* @module core
*/

/**
* Abstract class for site
*
* @class Site
* @constructor
* @extends Core
*/
var Site = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* Unique site id
	* @property id 
	* @type string
	*/
	this.id = '';
	/**
	* Name of site
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* true for active and  false for inactive
	* @property status
	* @type boolean
	* @default true
	*/
	this.status = true;
	/**
	* Collection of all allowed domains
	* @property domains
	* @type array
	*/
	this.domains = [];
	
	/**
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};

	/**
	* Find for exact domain or subdomain
	*
	* @method hasDomain
	* @public
	* @param {String} entry - Domain string
	* @returns {Boolean} - True when found a domain and false for not
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

	exports.Site = Site;
/**
* @module dom
*/

/**
* Abstract class for dom/html elements 
*
* @class DomElement
* @link https://developer.mozilla.org/en/DOM/element
*/
var DomElement = function(){
	/**
	* Id attribute of object
	* @property id
	* @type string
	*/
	this.id = '';
	/**
	* Dom element itself
	* @property element
	* @type object
	*/
	this.element = undefined;
};

	/**
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @static
	* @returns {Object} element
	*/
	DomElement.create = function(tagName, document){
		return document.createElement(tagName);
	};
	/**
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
	
	/**
	* @method setAttributes
	* @param {Object} attributes
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.setAttributes = function(attributes){
		var merge = require('../utils/merge').merge;
		merge(this.element, attributes);
	};
	
	/**
	* @method append
	* @param {Object} child
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.append = function(child){
		this.element.appendChild(child);
		return this;
	};
	/**
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
	/**
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
/**
* @module dom
*/
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Ad = require('../domain/ad').Ad;
	var Event = require('../domain/event').Event;
	
	
	/**
	* Base for any type of Dom ads.
	*
	* @class AdDom
	* @constructor
	* @extends Ad
	* @extends DomElement
	*/
	var AdDom = function(){
		// extends Ad
		Ad.apply(this, arguments);
		
		/**
		* Instance of tracker
		* @property tracker
		* @type tracker
		* @public
		*/
		this.tracker = {};
	};
	// extends DomElement
	AdDom.prototype = new DomElement();
	
	
	/**
	* @method getSpaceId
	* @returns {String} return the id of the first parent div
	*/
	AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
	
	/**
	* @method getClickTag
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
	
	/**
	* @method init
	* @param {Object} space
	* @param {Object} config
	* @param {String} page_url
	*/
	AdDom.prototype.init = function(space, config){
		var ad = this;
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
	};
	
	exports.AdDom = AdDom;
	
	
	
})();
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Space = require('../domain/space').Space;
	
	/**
	* Space dom
	*
	* @class SpaceDom
	* @extends DomElement
	* @requires Ad
	*/
	var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
		
		this.placements = {};
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();

	/**
	* @method placeAd
	* @param {Object} DomElement Ad to append in element
	* @returns {Object} return this to chain methods
	*/
	SpaceDom.prototype.placeAd = function(ad){
		this.element.appendChild(ad.element);
		ad.emit('placement');
		return this;
	};
	
	/**
	* @method getElement
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
/**
* @module request
*/

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
	
	/**
	* @property callback
	* @type function
	*/
	this.callback = undefined;
	
	/**
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
		var document = this.document || document;
		var img = document.createElement('img');
		img.src = this.getUrl();
		if( this.callback ){
			img.onload = this.callback.apply({ok:true});
		}
		return this;
	};
	
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
	* @returns {Object} this to chain
	*/
	JsonpRequest.prototype.queryCallback = function(str){
		this.qs.callback = str;
		return this;
	};

	/**
	* @method validate
	* @public
	* @returns {Boolean}
	*/
	JsonpRequest.prototype.validate = function(){
		return this.qs.callback !== undefined;
	};

	/**
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
	* @returns {Object} this to chain
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
/**
* @module request
*/
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
* @module Connection
*/

/**
* @class Connection
* @constructor
* @extends Http
*/
var Connection = function( attributes ){
	var Http = require('../request/http').Http;
	Http.apply(this, arguments);
	
	/**
	* Index of requests
	* @property _index
	* @type number
	* @protected
	*/
	this._index = 0;
	/**
	* Connection name
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* Requests storage
	* @property requests
	* @type object
	*/
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

/**
* @method id
* @public
* @returns {String} return current uuid
*/
Connection.prototype.id = function(){
	return 'n' + this._index;
};

/**
* @method newId
* @public
* @returns {String} Increment the index and return a new id
*/
Connection.prototype.newId = function(){
	this._index++;
	return this.id();
};

/**
* @method next
* @public
* @param {Object} req A Request instance
*/
Connection.prototype.next = function(req){
	var sign = this.newId();
	this.requests[sign] = req;
};
/**
* @method getCallbackPath
* @public
* @returns {String} path of callback
*/
Connection.prototype.getCallbackPath = function(){
	return [this.name, 'requests', this.id(), 'callback'].join('.');
};
/**
* @method request
* @public
* @returns {Object}
*/
Connection.prototype.request = require('../request/request').request;
/**
* @method get
* @public
* @returns {Object}
*/
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
/**
* @module ads
*/
/**
* @class Swf
*/
var Swf = function(){
	/**
	* Alignment of html content.
	* @property align
	* @type string
	*/
	this.align = "center";
	/**
	* Control right click menu options (true, false).
	* @property menu
	* @type boolean
	*/
	this.menu = false;
	/**
	* @property quality
	* @type string
	*/
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	/**
	* @property scale
	* @type string
	*/
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	/**
	* @property wmode
	* @type string
	*/
	this.wmode = "transparent"; //window,opaque,transparent
	/**
	* @property type
	* @type string
	*/
	this.type = "application/x-shockwave-flash";
	/**
	* @property allowScriptAccess
	* @type string
	*/
	this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
};
exports.Swf = Swf;
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	/**
	* Create embedable ads
	*
	* @class EmbedAd
	* @constructor
	* @param {Object} attributes
	* @extends AdDom
	* @extends Swf
	*/
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.src;
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			self.setAttributes(new Swf());
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	/**
	* Create embedable ads
	*
	* @class ObjectAd
	* @constructor
	* @param {Object} attributes
	*
	* @extends AdDom
	* @extends Swf
	*/	
	var ObjectAd = function(){
		var superclass = this;
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
	
		/**
		* @property CLASSID
		* @type string
		* @final
		* @private
		*/
		var CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
		/**
		* @property CODEBASE
		* @type string
		* @final
		* @private
		*/
		var CODEBASE = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0";
		/**
		* @property PLUGINSPAGE
		* @type string
		* @final
		* @private
		*/
		var PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer";
		
		/** 
		* @class Param
		* @constructor
		* @param {String} name
		* @param {String} value
		* @return HTMLElement
		*/
		var Param = function(name, value){
			/**
			* @property name
			* @type string
			*/
			this.name = name;
			/**
			* @property value
			* @type string
			*/
			this.value = value;
			/**
			* @property element
			* @type HTMLElement
			*/
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
* @extends AdDom
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var ImgAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('img');
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
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
* @module ads
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
* @module spaces
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	/**
	* Represents the type Expander space
	*
	* @class ExpandableSpace
	* @extends SpaceDom
	* @implements ISpace
	*/
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
	* @method clip
	* @param {Number} width
	* @param {Number} height
	* @return {Object}
	*/
	ExpandableSpace.prototype.clip = function(width, height){
		this.element.style.clip = "rect(0px " + width + " " + height + " 0px)";
		return this;
	};
	
	/**
	* @method expand
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
	* @method retract
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
* @module spaces
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	/**
	* Represents the type Floater
	* @class FloaterSpace
	* @extends SpaceDom
	*/
	var FloaterSpace = function(){
		SpaceDom.apply(this, arguments);
		/**
		* @method close
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
			bt.onclick = function(){
				self.close();
			};
			self.append(bt);
			
		})(this);
	};
	FloaterSpace.prototype = new SpaceDom();
	exports.FloaterSpace = FloaterSpace;
})();
/**
* @module spaces
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	/**
	* Represents the type Static
	* 
	* @class StaticSpace
	* @extends SpaceDom
	*/	
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
/**
* @module spaces
*/
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
/**
* @module api
*/
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Page = require('../domain/page').Page;
	var request = require('../request/request').request;
	var spaces = require('../spaces/spaces').spaces;
	
	/**
	* @class PageApi
	* @constructor
	* @extends Page
	* @extends EventEmitter
	*/			
	var PageApi = function(){
		Page.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.connection;
	};
	
	/**
	* @method getData
	* @param {Function} callback
	*/
	PageApi.prototype.getData = function(callback){
		var sign = this.connection.id();
		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/pages/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback',
			domain: this.domain,
			site_id: this.site_id,
			ads_per_space: this.adsPerSpace
		};
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
		
	};
	
	/**
	* @method scanSpaces
	* @param {Function} collection
	* @param {Function} callback
	*/
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
/**
* Api wrapper
* @module api
* @main api
*/
(function(global){
	var queryString = require('../node_modules/querystring').querystring;
	var copy = require('../utils/copy').copy;
	var Connection = require('../connection/connection').Connection;
	var Page = require('./page').PageApi;
	var Tracker = require('./tracker').Tracker;
	var defaultConfig = require('../config/config').config;
	// Required by Page.init
	var ads = require('../ads/ads').ads;
	
		
	var spacesCollection = {};
	var adsCollection = {};
	
	
	/**
	* @for PageApi
	* @method renderSpace
	* @param {Object} space Instance of Space Class to find and render in DOM
	* @param {Object} data Data of current view to track events
	* @param {Object} tracker Instance of tracker class
	* @static
	*/
	Page.renderSpace = function (space, data, tracker){
		// create a instance of Ad using data model provided
		var ad = ads.create(space.getAd());
		ad.tracker = tracker;
		ad = ad.init(space, data);
		
		// Placing ad in space
		space.placeAd(ad);
		
		// Exporting ad to api
		adsCollection[ad.id] = ad;
	};

	/**
	* @for PageApi
	* @method init
	* @public 
	*/
	Page.prototype.init = function(){
		
		var page = this;

		// Get all page data
		this.getData(function(err, data){
			// When we get spaces in this page
			if(data && data.spaces){
				// For each space found in document
				page.scanSpaces(data.spaces, function(err, space){
					// When find spaces
					if(!err){
						var config = {
							domain: page.domain,
							page_url: page.url,
							page_id: page.id,
							site_id: page.site_id
						};
						Page.renderSpace(space, config, tracker);
						// exporting space to api
						spacesCollection[space.id] = space;
					}
				});
			}
		});
		return page;
	};
	
	

	
	/**
	* @class Api
	*/
	global.adlayer = global.adlayer || {};

	var api = global.adlayer;
	
	// Merge config options
	var config = {};
	config.url = api.config.url || defaultConfig.url;
	config.adsPerSpace = api.config.adsPerSpace || defaultConfig.adsPerSpace;
	config.page = api.config.page || defaultConfig.page;
	
	/**
	* Exports config
	*
	* @property config
	* @type object
	*/
	api.config = config;


	var connections = {
		adserver: new Connection(config.url.adserver),
		tracker: new Connection(config.url.tracker)
	};
	
	var tracker = new Tracker();
	tracker.connection = connections.tracker;
	
	/**
	* Exports page api
	*
	* @property page
	* @type object
	*/
	api.page = {};
	/**
	* Exports configuration
	*
	* @property config
	* @type object
	*/
	api.config = config;
	/**
	* Exports connections
	*
	* @property connections
	* @type object
	*/
	api.connections = connections;
	/**
	* Exports spaces
	*
	* @property spaces
	* @type object
	* @example 
		var space = adlayer.spaces['0202kjj44949999992j8'];
		space.close();
	*/
	api.spaces = spacesCollection;
	/**
	* Exports ads
	*
	* @property ads
	* @type object
	* @example 
		var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
		ad.emit('load');
	*/
	api.ads = adsCollection;
	
	/**
	* @method initialization
	* @private
	*/
	(function initialization(){
		var document = global.document;
		
		if(config.page.autoRun && document) {
			
			var scriptTag = document.getElementById(config.page.scriptTagId);
			var queries = scriptTag.src.split('?')[1];
			var params = queryString.parse(queries);

			config.site_id = config.site_id || params.site;
			config.domain = config.domain || global.location.hostname;
			config.page_id = config.page_id || params.page;
			config.page_url = config.page_url || global.location.href;
			
			api.page = new Page({
				tracker: tracker,
				id: config.page_id,
				url: config.page_url,
				site_id: config.site_id,
				domain: config.domain,
				connection: connections.adserver,
				document: document,
				adsPerSpace: config.adsPerSpace
			});
			api.page.init();
		}
	})();
	
	
})(this);