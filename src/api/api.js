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