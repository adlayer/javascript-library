(function(global){
	var copy = require('../utils/copy').copy;
	var Connection = require('../connection/connection').Connection;
	var Page = require('./page').PageApi;
	var Tracker = require('./tracker').Tracker;
	var config = require('../config/config').config;
	// Required by Page.init
	var ads = require('../ads/ads').ads;
	
	// Extend or define Adlayer
	global.adlayer = global.adlayer || {};
	var api = global.adlayer;
	
	// Configs
	api.config = api.config || config;

	// Connections
	var connections = {
		adserver: new Connection(api.config.url.adserver),
		tracker: new Connection(api.config.url.tracker)
	};
	
	// Tracker instance
	var tracker = new Tracker();
	tracker.connection = connections.tracker;
	
	
	// Connections api
	api.connections = connections;
	
	// Space api
	api.spaces = {};
	
	// Ad api
	api.ads = {};

	/**
	* 
	*/
	Page.prototype.init = function(){
		
		// Save reference to use in closures
		var page = this;
		
		// Get all page data
		this.getData(function(err, data){
			// When we get spaces in this page
			if(data && data.spaces){
				// For each space found in document
				page.scanSpaces(data.spaces, function(err, space){
					if(!err){
						var trackerUrl = page.tracker.connection.getUrl();
						
						var ad = ads.create(space.getAd());
						ad.on('load', function(){
							page.tracker.track({	
								type: 'impression', // should be required just in tracker server
								ad_id: ad.id,
								campaign_id: ad.campaign_id,
								space_id: space.id,
								site_id: page.from_site,
								page_id: page.id,
								page_url: 'http://adlayer.com.br'
							});
						});

						space.placeAd(ad);

						// Needs to be called after ad placement to find the space.id
						var clickTag = ad.getClickTag(trackerUrl, 'ok', 'ok', 'ok');
						ad.element.href = clickTag;
					}
				});
			}
		});
	};
	
	// Page api	
	var page = new Page({
		id: 'f66458ae7be6306d7dd2ab99b002b5ef',
		connection: connections.adserver,
		tracker: tracker,
		document: document
	});
	page.init();
	
	
	// Page api
	api.page = page;
	
})(this);