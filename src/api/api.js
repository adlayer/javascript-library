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
	
	/**
 	* Extend or define Adlayer
	* @class api
	*/
	global.adlayer = global.adlayer || {};
	/**
 	* @property api
	* @type object
	* @private
	*/
	var api = global.adlayer;
	
	/**
 	* @property config
	* @type object
	* @private
	*/
	var config = api.config || defaultConfig;

	/**
 	* @property connections
	* @type object
	* @private
	*/
	var connections = {
		adserver: new Connection(config.url.adserver),
		tracker: new Connection(config.url.tracker)
	};
	
	/**
 	* @property tracker
	* @type object
	* @private
	*/
	var tracker = new Tracker();
	tracker.connection = connections.tracker;

	/**
 	* @property page
	* @type object
	* @private
	*/
	var page = {};
	
	/**
	* Collections of rendered spaces
	*
 	* @property spacesCollection
	* @type object
	* @private
	*/
	var spacesCollection = {};
	
	/**
	* Collections of placed ads
	*
 	* @property adsCollection
	* @type object
	* @private
	*/
	var adsCollection = {};

	/**
	* @method adInit
	* @param {Space} space
	* @param {Ad} ad
	* @return {Ad}
	* @private
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
	* @method spaceInit
	* @param {Space} space
	* @private
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
	* @method init
	* @static 
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
	
	/**
	* @method initialization
	* @private
	*/
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
	
	/**
	* Exports page api
	*
 	* @property page
	* @type object
	*/
	api.page = page;
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
	*/
	api.spaces = spacesCollection;
	/**
	* Exports ads
	*
 	* @property ads
	* @type object
	*/
	api.ads = adsCollection;
	
})(this);