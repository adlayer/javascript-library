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
	Page.init = function(){
		// Page api	
		var page = new Page({
			id: 'f66458ae7be6306d7dd2ab99b002b5ef',
			connection: connections.adserver,
			document: document
		});
		
		// Get all page data
		page.getData(function(err, data){
			// When we get spaces in this page
			if(data && data.spaces){
				// For each space found in document
				page.scanSpaces(data.spaces, function(err, space){
					if(!err){
						
						// Instance of ad using model provided
						var ad = ads.create(space.getAd());
						ad.tracker = tracker;

						// Listener for 'LOAD' event
						ad.on('load', function(){
							ad.tracker.track({
								type: 'impression', // should be required just in tracker server
								ad_id: ad.id,
								campaign_id: ad.campaign_id,
								space_id: space.id,
								site_id: page.from_site,
								page_id: page.id,
								page_url: 'http://adlayer.com.br'
							});
						});

						// Listener for 'PLACEMENT' event
						ad.on('placement', function(){
							// Setting click tag in ad element
							var clickTag = ad.getClickTag('site_id', page.id, 'http://adlayer.com.br');
							ad.element.href = clickTag;
						});
						
						// Placing ad in space
						space.placeAd(ad);

					}
				});
			}
		});
		return page;
	};
	
	// Page api
	api.page = Page.init();
	
})(this);