(function(global){
	var copy = require('../utils/copy').copy;
	var request = require('../request/request').request;
	var Event = require('../domai/core').Event;
	var Connection = require('../connection/connection').Connection;
	var Page = require('./page').PageApi;
	var Tracker = require('./tracker').Tracker;
	var ads = require('../ads/ads').ads;
	var spaces = require('../spaces/spaces').spaces;
	var config = require('../config/').config;
	
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

	// Page data model
	Page.prototype.getData = function(callback){

		var sign = this.connection.id();
		var opts = copy(config.url.adserver);
		opts.host = opts.host;
		opts.path = '/pages/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback'
		};
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
		
	};
	
	// Page spaces iterator
	Page.prototype.scanSpaces = function(spaces, callback){
		for( var i = 0; i < spaces.length; i++ ){
			var space = spaces[i];
			var divSpace = document.getElementById(space._id);
			
			if ( divSpace ){
				space.element = divSpace;
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
	
	// Page init
	Page.prototype.init = function(){
		page.getData(function(err, data){
			if(data && data.spaces){
				api.page.scanSpaces(data.spaces, function(err, space){
					if(!err){
						var trackerUrl = tracker.connection.getUrl();
						space = spaces.create(space);
						var ad = ads.create(space.getRandomAd());

						ad.on('load', function(){
							tracker.track({
								type: 'impression', // should be required just in tracker server
								ad_id: ad.id,
								browser: 'firefox',
								campaign_id: 'skyelivre',
								page_url: 'http://adlayer.com.br',
								site_id: 'site123',
								page_id: 'page124',
								space_id: 'space123'
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
	}	
	
	// Page api	
	var page = new Page({
		id: 'f66458ae7be6306d7dd2ab99b002b5ef',
		connection: connections.adserver
	});
	page.init();
	
	// Page api
	api.page = page;
	
	// Connections api
	api.connections = connections;
	
	// Space api
	api.space = {};
	
	// Ad api
	api.ad = {};

})(this);