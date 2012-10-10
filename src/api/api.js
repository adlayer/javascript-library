(function(window){
	
/**
* Api wrapper
* @module api
* @main api
*/

var queryString = require('../node_modules/querystring').querystring;
var Connection = require('../connection/connection').Connection;
var Page = require('./page').PageApi;
var Tracker = require('../tracker/tracker').Tracker;
var defaultConfig = require('../config/config').config;

	
/**
* @class Api
*/
var global = global || window;
var api = global.adlayer || {};

// Defining configs
var config = api.config || {};

// Merging config options
config.url = config.url || defaultConfig.url;
config.adsPerSpace = config.adsPerSpace || defaultConfig.adsPerSpace;
config.page = config.page || defaultConfig.page;

/**
* Exports config
*
* @property config
* @type object
*/
api.config = config;

// Defining connections
var connections = {
	adserver: new Connection(config.url.adserver),
	tracker: new Connection(config.url.tracker)
};

// Defining tracker	
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
api.spaces = {};
/**
* Exports ads
*
* @property ads
* @type object
* @example 
	var ad = adlayer.ads['mfkvfmvkdfvdf84848484'];
	ad.emit('load');
*/
api.ads = {};

/**
* Shortcut for adlayer.ads[id].emit, used by flash preloaders
*
* @method markAdAsLoaded
* @param {String} id
* @public
*/
api.markAdAsLoaded = function(id){	
	api.ads[id].emit('load');
};

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
		
		var page = new Page({
			tracker: tracker,
			id: config.page_id,
			url: config.page_url,
			site_id: config.site_id,
			domain: config.domain,
			connection: connections.adserver,
			document: document,
			adsPerSpace: config.adsPerSpace
		});

		api.page = page.init();
		api.spaces = page.spacesCollection;
		api.ads = page.adsCollection;
	}
})();
})(this);