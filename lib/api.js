/*!
* Adlayer JavaScript Library v0.1.1
* http://adlayer.com.br
*
* Copyright 2011, Adlayer
*/
(function(global){ 
	"use strict";
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
	stringfy:function(obj){
		var sep = "&";
		var eq = "=";
		var list =  [];
		
		for(var param in obj){
			if(obj.hasOwnProperty(param)){
				list.push(param + eq + obj[param]);
			}
		}
		return list.join(sep);
	}
};
exports.querystring = queryString;
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
		if(eventListeners.length > 0){
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
* @configs
*/
var configs = {
	tracker: {
		protocol: 'http',
		host: 'tracker.adlayerapp.com',
		port: 80
	},
	jocasta:{
		protocol: 'http',
		host: 'jocasta.adlayerapp.com',
		port: 80
	},
	sdk:{
		protocol: 'http',
		host: 'adlayerjavascriptsdk.com',
		port:80
	}
};
exports.configs = configs;
exports.keys = {
	page: '',
	site: '',
	domain: ''
};
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
/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {

	var done = false, top = true,

	doc = win.document, root = doc.documentElement,

	add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
	rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
	pre = doc.addEventListener ? '' : 'on',

	init = function(e) {
		if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
			return;
		}
		(e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) {
			fn.call(win, e.type || e);
		}
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState === 'complete') {
		fn.call(win, 'lazy');
	}
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) {
				poll();
			}
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}
}
exports.contentloaded = contentLoaded;
// TODO: Remove browser sniffing and use feature detection
var userAgent = navigator.userAgent.toLowerCase();
var browser = {
	version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1],
	safari: /webkit/.test(userAgent),
	opera: /opera/.test(userAgent),
	msie: (/msie/.test(userAgent)) && (!/opera/.test( userAgent )),
	mozilla: (/mozilla/.test(userAgent)) && (!/(compatible|webkit)/.test(userAgent))
};

var scriptQuery = document.getElementById("adlayerScript").src.split("?")[1];

/**
 * @public
 * @return {String}
 */
function getPageId(){
	return queryString.parse(scriptQuery).page;
}

/**
 * @public
 * @return {String}
 */
function getSiteId(){
	return queryString.parse(scriptQuery).site;
}

/**
 * Redefine keys autodetects by browser env
 */
var keys = require('./keys').keys;
exports.keys.page = keys.page = getPageId();
exports.keys.site = keys.site = getSiteId();
exports.keys.domain = keys.domain = global.location.hostname;
/**
* @Interface HttpRequest
*/
var HttpRequest = function(){};
HttpRequest.prototype.save = function(){};
exports.http_request = HttpRequest;
/**
 * @class JSONPRequest
 * @implements HttpRequest
 * @classDescription Make an http request expeting for jsonp return
 * @param {String} url
 * @param {Object} queries
 * @param {Function} callback
 */
var JSONPRequest = function(url, queries, callback, error){
	var queryString = require('../node_modules/querystring').querystring;
	var loadScript = require('../utils/loadscript').loadscript;
	var HttpRequest = require('./http_request').http_request;
	HttpRequest.apply(this, arguments);

	this.url = url;
	this.id = '';
	this.queries = queries || {};
	this.callback = callback;
	
	this.setId = function(id){
		this.id = id;
		return this;
	};
	
	this.send = function(){
		queries.callback = 'adlayer.connections.page.requests.' + this.id + '.callback';
		var str = queryString.stringfy(this.queries);
		var resource = loadScript(this.url + '?' + str, undefined, error);
		return this;
	};
};
exports.jsonp_request = JSONPRequest;
/**
 * @class IMGRequest
 * @implements HttpRequest
 * @classDescription Make an http request expeting for img return
 * @param {String} url
 * @param {Object} queries
 * @param {Function} callback
 */
var IMGRequest = function(url, queries, callback){
	var HttpRequest = require('./http_request').http_request;
	HttpRequest.apply(this, arguments);

	this.url = url;
	this.id = '';
	this.queries = queries || {};
	this.callback = callback;
	
	this.setId = function(id){
		this.id = id;
		return this;
	};
	
	this.send = function(){
		var imgReq = document.createElement("img");
		imgReq.src = url + '?' + queryString.stringfy(this.queries);
		imgReq.onload = function () {
			if(callback){callback();}
		};
		return this;
	};
};
exports.img_request = IMGRequest;
/**
* @class Connection
*/
var Connection = function(name, options){
	var index = 0;
	this.name = name;
	this.requests = {};

	this.protocol = options.protocol;
	this.host = options.host;
	this.port = options.port;
	this.path = options.path;
	
	this.getUrl = function(){
		var url = '';
		url += this.protocol + '://';
		url += this.host;
		url +=':' + this.port;
		
		this.url = url;
		return this.url;
	};
	
	this.request = function(){
		var JSONPRequest = require('../request/jsonp_request').jsonp_request;
		var _self = this;
		var id = 'n' + index++;

		return {
			jsonp: function(path, queries, callback, error){
				var instance = new JSONPRequest( _self.getUrl() + path, queries, callback, error);
				instance.setId(id);
				instance.send();
				_self.requests[id] = instance;
				return _self.requests[id];
			},
			img: function(path, queries, callback, error){
				var instance = new IMGRequest(_self.getUrl() + path, queries, callback, error);
				instance.setId(id);
				instance.send();
				_self.requests[id] = instance;
				return _self.requests[id];
			}
		};
	};
};
exports.connection = Connection;
/**
 * @class ConnectionsManager
 * @classDescription Singleton for access and control all connections
 */
(function(){
	var Connection = require('./connection').connection;
	var ConnectionsManager = function(){
		this.total = 0;
		this.connections = {};
	};
	/** @public **/
	ConnectionsManager.prototype.get = function(name){
		return this.connections[name];
	};
	/** @public **/
	ConnectionsManager.prototype.create = function(name, options){
		this.total++;
		this.connections[name] = new Connection(name, options);
		return this.connections[name];
	};

	/** @static **/
	ConnectionsManager.instance = undefined;

	/** @static **/
	ConnectionsManager.getInstance = function(){
		if( ConnectionsManager.instance ){
			return ConnectionsManager.instance;
		}
		return new ConnectionsManager();
	};
	exports.connection_manager = ConnectionsManager;
})();
/**
* @connections
*/

(function(){
	var ConnectionsManager = require('./connection/connection_manager').connection_manager;
	ConnectionsManager = ConnectionsManager.getInstance();

	var configs = require('./configs').configs;

	ConnectionsManager.create('static', configs.sdk);
	ConnectionsManager.create('page', configs.jocasta);
	ConnectionsManager.create('impressions', configs.tracker);
	
	exports.connections = ConnectionsManager.connections;
})();
/**
 * @class Size
 * @param {number} width
 * @param {number} height
 * @param {string} type
 */
var Size = function(width,height){
	this.width = width;
	this.height = height;
};
exports.size = Size;
/**
 * @class Format
 * @extends	Size
 * @param {number} width
 * @param {number} height
 * @param {string} type
 */
var Format = function(width,height,type){
	var Size = require('./size').size;
	Size.apply(this,arguments);
	
	this.type = type;
};
exports.format = Format;
/**
 * @interface Saveble
 * @todo: ver se é melhor passa o site por aqui ou no server
 */

var Salvable = function () {
	var connections = require('../connections').connections;
	this.save = function(){
		var query = {
			//ad_id:this.ad_id,
			campaign_id:this.campaign_id,
			space_id:this.space_id,
			page_url:this.page_url,
			site_id: this.site_id,
			page_id: this.page_id
		};
		connections.impressions.request().img('/impression/' + this.ad_id, query);
	};
};
exports.Salvable = Salvable;
/**
 * @class Log
 */
var Log = function(){
	var keys = require('../keys').keys;
	this.campaign_id = "";
	this.site_id = keys.site;
	this.page_id = keys.page;
	this.space_id = "";
	this.page_url = document.URL;
};
exports.Log = Log;
/**
 * @class Click
 * @extends Log
 * @implements Salvable
 */
var Click = function(){
	var Log = require('./log').Log;
	var Salvable = require('./salvable').Salvable;
	Log.apply(this,arguments);
	Salvable.apply(this,arguments);
	this.type = "click";
};
exports.Click = Click;
/**
 * @class Impression
 * @extends Log
 * @implements Salvable
 */
var Impression = function(){
	var Log = require('./log').Log;
	var Salvable = require('./salvable').Salvable;
	Log.apply(this,arguments);
	Salvable.apply(this,arguments);
	this.type = "impression";
};
exports.Impression = Impression;
/**
* @constructor HtmlTag
* @return {Object} HtmlTag
* @link https://developer.mozilla.org/en/DOM/element
*/

var HtmlTag = function(){
	this.element = {};
	this.id = "";
	this.link = "";
	this.rel = "";
	this.src = "";
	
	this.addEventListener = function(type,fn){
		if (global.addEventListener) {
			this.element.addEventListener(type, fn, false);
		}
		else if (global.attachEvent) {
			this.element.attachEvent('on' + type, fn);
		}
		else {
			this.element['on' + type] = fn;
		}
		return this;
	};
	
	this.extendAttributes = function(attributes){
		for(var attr in attributes){
			if(attributes.hasOwnProperty(attr) && attr !== "element" && typeof attributes[attr] !== "function"){
				this.element.setAttribute(attr, attributes[attr]);
			}
		}
		return this;
	};
};
exports.html_tag = HtmlTag;
 /**
 * @class Flash
 * @extends HtmlTag
 * */
var Flash = function(id,src,link,width,height,rel){
	var HtmlTag = require('../html_tag').html_tag;
	var EventEmitter = require('../../node_modules/events').events.EventEmitter;
	HtmlTag.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	
	var connection = require('../../connections').connections;
	var Impression = require('../../models/impression').Impression;
	var queryString = require('../../node_modules/querystring').querystring;
	
	this.id = id;
	this.rel = rel;
	this.src = src;
	this.height = height;
	this.width = width;
	this.align = "center";
	this.link = link;
	this.name = id;
	
	
	this.menu = false;
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	this.wmode = "transparent";//window,opaque,transparent
	this.allowScriptAccess = "always";// "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
	this.link = "";	
	
	/** 
	* @public
	* @return {String}
	*/
	this.getSrc = function(){
		var preloaderUrl = connection['static'].getUrl() + '/lib/as3.swf';
		var query = queryString.stringfy({
			"src":this.src,
			"ad_id":this.id,
			"link":this.link
		});
		return preloaderUrl + "?" +query;
	};
	
	var __construct = (function(_self){
		// todo: migrate this to class ad or swfAd
		_self.addListener("load", function(){
			var print = new Impression();
			print.campaign_id = _self.rel;
			print.space_id = _self.element.parentNode.id;
			print.ad_id = _self.id;
			print.save();
		});
		
		// exporting this instance to ads namespace
		//todo: remove this from this place to work in node
		Ad.ads[_self.id] = _self;
	})(this);
};
exports.flash = Flash;
/** 
* @class EmbedTag
* @extends {Size}
* @extends {Flash}
* <embed></embed> 
*/
var EmbedTag = function(){
	var Size = require('../../size').size;
	var Flash = require('./flash').flash;
	Size.apply(this, arguments);
	Flash.apply(this, arguments);
	
	/* @private */
	var __construct = function(_self){
		_self.src = _self.getSrc();
		_self.element = document.createElement("embed");
		
		_self.extendAttributes(_self);

	}(this);
	return this.element;
};
exports.embed_tag = EmbedTag;

/**
 * @class ObjectTag
 * @see http://kb2.adobe.com/cps/127/tn_12701.html
 */
var ObjectTag = function(){
	var Size = require('../../size').size;
	var Flash = require('./flash').flash;
	Size.apply(this, arguments);
	Flash.apply(this, arguments);

	var CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
	var CODEBASE = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0";
	var PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer";
	
	/** @class Param
	* <param name="wmode" value="tranparent" />
	*/
	var Param = function(name,value){
		this.name = name;
		this.value = value;
		this.element = document.createElement("param");
		this.element.setAttribute("name",this.name);
		this.element.setAttribute("value",this.value);
		return this.element;
	};

	var __construct = function(_self) {
		_self.element = document.createElement("object");
		
		_self.element.setAttribute("type","application/x-shockwave-flash");
		_self.element.setAttribute("width",_self.width);
		_self.element.setAttribute("height",_self.height);
		_self.element.setAttribute("data",_self.getSrc());
		_self.element.setAttribute("id",_self.id);
		_self.element.setAttribute("rel",_self.rel);
		_self.element.setAttribute("classid",CLASSID);
		_self.element.setAttribute("codebase",CODEBASE);
		
		// http://stackoverflow.com/questions/1168494/how-do-i-programmatically-set-all-objects-to-have-the-wmode-set-to-opaque
		var clone = _self.element.cloneNode(true);

		clone.appendChild(new Param("movie",_self.getSrc()));
		clone.appendChild(new Param("quality",_self.quality));		
		clone.appendChild(new Param("src",_self.getSrc()));
		clone.appendChild(new Param("menu",_self.menu));
		clone.appendChild(new Param("scale",_self.scale));
		clone.appendChild(new Param("allowScriptAccess",_self.allowScriptAccess));
		clone.appendChild(new Param("allowNetworking","all"));
		clone.appendChild(new Param("base",_self.base));
		clone.appendChild(new Param("wmode",_self.wmode));
		
		_self.element = clone;
		
	}(this);
	return this.element;
};
/**
 * @class AnchorTag
 * @param id
 * @param text
 * @param href
 * @return {element}
 */
var AnchorTag = function (id, href, rel) {
	var Size = require('../size').size;
	Size.apply(this,arguments);
	this.href = href;
	this.rel = rel;
	this.id = id;
	this.element = {};
	
	var __construct = function (_self) {
		_self.element = document.createElement("a");
		_self.element.href = _self.href;
		_self.element.rel = _self.rel;
		_self.element.id = _self.id;
	}(this);
	return this.element;
};
exports.anchor_tag = AnchorTag;
/**
 * @class ImgTag
 * @param src
 * @return {element}
 */
var ImgTag = function (src) {
	var Size = require('../size').size;
	Size.apply(this,arguments);
	
	this.src = src;
	this.element = {};
	var __construct = function (_self) {
		_self.element = document.createElement("img");
		_self.element.src = _self.src;
	}(this);
	return this.element;
};
exports.img_tag = ImgTag;
/**
 * @class Ad
 * @extends {Format}
 * @param {string} id
 */
var Ad = function(){
	var Format = require('../format').format;
	Format.apply(this, arguments);
	
	var configs = require('../configs').configs;
	var Log = require('../models/log').log;
	
	/*	@property {string} link */
	this.link			=	"";
	/*	@property {string} id Id of ad in DOM and couchdb */
	this.id				=	"";
	/**
	* @property	{object}	alternative	Properties	of	alternative	ad
	* @deprecated just in next version
	**/
	this.alternative	=	"";
	/**
	* @public
	* @property {string} file Link to external location of ad
	**/
	this.file			=	"";
	/**
	* @public
	* @property {string} element Reference to ad in DOM
	* @requires {this.id}
	**/
	this.element		=	{};

	this.width		=	"";
	this.height		=	"";
	
	this.setSpaceInLink = function(id){
		throw "Should subscribe it";
	};
	
	this.clickTag = function(){
		var protocol = global.location.protocol;
		
		var url = protocol + '//' + configs.tracker.host + ':' + configs.tracker.port;
		url += "/click";
		url += "/" + this.id;
		
		var data = new Log();
		data.campaign_id = this.campaign;
		data.link = this.link;
		url += "?" + queryString.stringfy(data);
		return url;
	};
	
};

/** @static **/
Ad.ads = {};
Ad.getAd = function(id){
	return Ad.ads[id];
};

exports.getAd = Ad.getAd;
exports.ad = Ad;
/**
 * @class ImgAd
 * @param id
 * @param href
 * @param src
 * @return {string}
 */
var ImgAd = function(id, src, href, width, height, rel){
	var HtmlTag = require('../html/html_tag').html_tag;
	var Ad = require('./ad').ad;
	var EventEmitter = require('./node_modules/events').events.EventEmitter;
	var AnchorTag = require('../html/anchor_tag').anchor_tag;
	var Click = require('../models/click').Click;
	var ImgTag = require('../html/img_tag').img_tag;
	var Impression = require('../models/impression').Impression;
	
	HtmlTag.apply(this,arguments);
	Ad.apply(this, arguments);
	EventEmitter.apply(this,arguments);
	
	this.id = id;
	this.file = src;
	this.link = href;
	this.width = width;
	this.height = height;
	this.campaign = rel;
	
	var __construct = (function(_self){
		var anchor = new AnchorTag(id, _self.clickTag(), rel);
		_self.element = anchor;
		
		_self.on("click",function(){
			var click = new Click();
			click.ad_id = anchor.id;
			click.campaign_id = anchor.parentNode.rel;
			click.space_id = anchor.parentNode.id;
			click.save();
		});
		_self.addEventListener("click",function(){
			return _self.emit("click");
		});
		
		var img = new ImgTag(src);
		_self.on("load",function(){
			var print = new Impression();
			print.ad_id = img.parentNode.id;
			print.campaign_id = img.parentNode.rel;
			print.space_id = img.parentNode.parentNode.id;
			print.save();
		});
		img.onload = function(){
			return _self.emit("load");
		};
		anchor.appendChild(img);
		Ad.ads[anchor.id] = _self;
		return _self.element;
	})(this);
	return this.element;
};
exports.img_ad = ImgAd;
/**
 * @class SwfAd
 * @todo: trazer os methods de log click e impressions pra essa classe
 * @pattern factory
 * @param id
 * @param file
 * @param link
 * @param width
 * @param height
 * @param campaign
 * @return {Object} HtmlTag
 */
var SwfAd = function(id,file,link, width,height,campaign){	
	var Ad = require('./ad').ad;
	Ad.apply(this, arguments);
	
	var ObjectTag = require('../html/flash/object_tag').object_tag;
	var EmbedTag = require('../html/flash/embed_tag').embed_tag;
	
	this.element = {};
	var __construct = function(_self){
		if(browser.msie){
			_self.element = new ObjectTag(id,file,link,width,height,campaign);
		} else{
			_self.element = new EmbedTag(id,file,link,width,height,campaign);
		}

	}(this);
	return this.element;
};
exports.swf_ad = SwfAd;
/**
 * @constructor AdsFactory
 * @TODO: handle undefined file type
 */
var AdsFactory = function(){};

/**
 * @static
 * @param {Object} model
 * @return {Object} Ad
 */
AdsFactory.create = function(model){
	var ImgAd = require('./img_ad').img_ad;
	var SwfAd = require('./swf_ad').swf_ad;
	
	var type = model.type;
	switch(type){
		case "image":
			return new ImgAd(model._id,model.file,model.link,model.width,model.height,model.campaign_id);
	
		case "flash":
			return new SwfAd(model._id,model.file,model.link,model.width,model.height,model.campaign_id);
	}
};
exports.ads_factory = AdsFactory;
/**
* @interface ISpace
*/
var ISpace = function(){
	this.render = function(){ return new Error("not implemented");};
	this.insertAd = function(){return new Error("not implemented");};
};
exports.ispace = ISpace;
/**
* @class Space
* @abstract
* @constructor
* @extends {Format}
* @param {string} id
*/
var Space = function(id){
	var queryString = require('../node_modules/querystring').querystring;
	var AdsFactory = require('../ads/ads_factory').ads_factory;
	var Format = require('../format').format;
	Format.apply(this, arguments);
	
	/* @property {string} id Id of html space */
	this.id         =   id;
	/* @property {string} type */
	this.type = "";
	/* @property {array} ads list of ads to this space */
	this.ads        =	[];
	/* @property {element} element Point to space in DOM */
	this.element    =	{};
	
	/**
	* @public
	* @param {Object} attributes
	* @return {Object}
	*/
	this.insertAd = function(attributes){
		if(attributes){
			var adElement = AdsFactory.create(attributes);
			if(adElement){
				//select the space by id
				this.element.appendChild(adElement);
				
				if(adElement.href){
					var link = queryString.parse(adElement.href);
					link.space_id = this.id;
					adElement.href = queryString.stringfy(link);
				}
				
				return this.element;
			}
		} else{
			throw new Error("Ad attributes are needed");
		}
	};
	
	/* @public */
	this.insertRandomAd = function(){
		var randomAd = Math.floor(Math.random() * this.ads.length);
		if(this.ads[randomAd]){
			this.insertAd(this.ads[randomAd]);
		}
	};
	
	/* @public */
	this.setSizes = function(){
		this.element.style.height = this.size.height;
		this.element.style.width = this.size.width;
	};
	
	/**
	* @constructs
	* @private
	* @param {Object} _self
	* @todo: call factory(this.type)
	*/
	var __construct = function(_self){
		_self.element = document.getElementById(_self.id);
		return _self;	
	}(this);
};
exports.space = Space;
/**
* @class represents the type Expandable
* @extends Space
* @implements ISpace
*/
var ExpandableSpace = function(){
	var ISpace = require('./ispace').ispace;
	var Space = require('./space').space;
	
	ISpace.call(this);
	Space.apply(this,arguments);
	
	/**
	* @public
	* @return {Object}
	*/
	this.clip = function(width, height){
		this.element.style.clip = "rect(0px " + width + " " + height + " 0px)";
		return this;
	};
	
	/**
	* @public
	* @return {Object}
	*/
	this.expand = function(){
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
	this.retract = function(){
		this.clip(this.size.width, this.size.height);
		return this;
	};
	
	/**
	* @public
	* @return {Object}
	*/
	this.render = function(){
		var _self = this;
		this.element.style.position = "absolute";
		this.setSizes();
		this.clip(this.size.width, this.size.height);
		this.insertRandomAd();
		
		this.element.onmouseover = function(){
			_self.expand();
		};
		this.element.onmouseout = function(){
			_self.retract();
		};
		
		return this.element;
	};
};
exports.expandable_space = ExpandableSpace;
/**
* @class represents the type Floater
* @extends Space
* @implements ISpace
*/
var FloaterSpace = function(){
	var ISpace = require('./ispace').ispace;
	var Space = require('./space').space;
	
	ISpace.call(this);
	Space.apply(this,arguments);
	
	var _self = this;

	/**
	* @public
	*/
	this.close = function(){
		var space = _self.element;
		space.parentNode.removeChild(space);
	};
	
	/**
	* @public
	* @return {Object}
	*/
	this.render = function(){
		this.setSizes();
		this.element.style.position = "absolute";
		
		var bt = document.createElement("button");
		bt.innerHTML = "fechar";
		bt.onclick = this.close;
		this.element.appendChild(bt);
		
		this.insertRandomAd();
		return this.element;
	};
};
exports.floater_space = FloaterSpace;
/**
* @class represents the type Static
* @extends Space
* @implements ISpace
*/
var StaticSpace = function(){
	var ISpace = require('./ispace').ispace;
	var Space = require('./space').space;
	
	ISpace.call(this);
	Space.apply(this,arguments);
	
	/**
	* @public
	* @return {Object}
	*/
	this.render = function(){
		this.setSizes();
		this.insertRandomAd();
		return this.element;
	};
};
exports.static_space = StaticSpace;
/**
* @class Factory of spaces
**/
var SpaceFactory = function(){};

/** 
* @static
*/
SpaceFactory.transform = function transform(spaceModel){
	var actSpace = SpaceFactory.create(spaceModel._id, spaceModel.type);
	merge(actSpace, spaceModel);
	
	actSpace.id = spaceModel._id;					
	actSpace.render();
};


/** 
* @static 
* @param {String} id
* @param {String} type
* @return {Object}
*/
SpaceFactory.create = function(id,type){
	var ExpandableSpace = require('./expandable_space').expandable_space;
	var FloaterSpace = require('./floater_space').floater_space;
	var StaticSpace = require('./static_space').static_space;
	
	if(type === "expandable"){
		return new ExpandableSpace(id);
	}
	else if (type === "floater") {
		return new FloaterSpace(id);
	}
	else {
		return new StaticSpace(id);
	}
};
exports.space_factory = SpaceFactory;
/**
 * @namespace
 * @public
 * @return {Object} api
 */
var page = (function(){
	var EventEmitter = require('./node_modules/events').events.EventEmitter;
	var keys = require('./keys').keys;
	var connections = require('./connections').connections;
	
	var api = new EventEmitter();
	
	/* @property {Object} */
	api.url = {
		/* @property {String} */
		domain: keys.domain
	};
	
	/**
	* @public
	* @return {String}
	*/	
	api.id = keys.page;
	
	/**
	* @public
	* @return {String}
	*/
	api.fromSite = keys.site;
	
	/**
	* @public
	* @param {Function} callback
	*/
	api.getData = function(callback, error){
		var query = { domain : api.url.domain };
		var url = '/page/' + this.id;
		connections.page.request().jsonp(url, query, callback, error);
	};

	/**
	* @public
	*/
	api.spaces = [];
	
	/**
	* @public
	* @param {Function} sucess
	* @param {Function} error
	* // TODO: pass document as param to be cross-plataform
	*/
	api.scan = function(sucess, error){
		if(api.spaces){
			for(var i = 0; i < api.spaces.length; i++){
				var spaceModel = api.spaces[i];
				var spaceId = api.spaces[i]._id;

				if(document.getElementById(spaceId) && sucess){
					sucess(spaceModel);
				} else if (error){
					error(spaceModel);
				}
			}
			return api.spaces;
		}
	};
	
	// Exposing api
	return api; 
})();

exports.page = page;
(function(){
	var contentLoaded = require('./utils/contentloaded').contentloaded;
	var page = require('./page').page;

	page.getData(function(content){
		// Waiting for page ready
		page.on('ready', function(){
			page.spaces = content.spaces;
			page.scan(SpaceFactory.transform);
		});

		// Emit ready
		contentLoaded(global, function(){
			page.emit('ready');
		});
	});
})();
(function(){
	global.adlayer = {
		auth: exports.keys,
		connections: exports.connections,
		getAd: exports.getAd,
		page: exports.page
	};
})();
})(this);