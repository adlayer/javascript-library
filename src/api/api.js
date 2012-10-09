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
	var Tracker = require('../tracker/tracker').Tracker;
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
	* @static
	*/
	Page.prototype.renderSpace = function (space, data){
		var result = space.init(this.tracker, data);
		var ad = result.ad;
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
						page.renderSpace(space, config, tracker);
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