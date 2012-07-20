(function(global){
	var request = require('../request/request').request;
	var Event = require('../domai/core').Event;
	var Connection = require('../connection/connection').Connection;
	var Page = require('./page').PageApi;
	var ads = require('../ads/ads').ads;
	var spaces = require('../spaces/spaces').spaces;
	var config = require('../config/').config;
	
	// Extend or define Adlayer
	global.adlayer = global.adlayer || {};
	var api = global.adlayer;
	
	// Configs
	api.config = api.config || config;
	
	// Prototype pattern Object.create() in old browsers
	function copy(obj){
		function F(){}
		F.prototype = obj;
		return new F();
	}

	// Connections
	var connections = {
		adserver: new Connection(api.config.url.adserver),
		tracker: new Connection(api.config.url.tracker)
	};
	api.connections = connections;

	Page.prototype.getData = function(callback){
		
		var sign = api.connections.adserver.newId();
		var opts = copy(api.config.url.adserver);
		opts.host = opts.host;
		opts.path = '/pages/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback'
		};
		api.connections.adserver.requests[sign] = request().get(opts, callback);
		
	};
	
	// Spaces iterator
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
	
	/**
	* @constructor Tracker
	*/
	function Tracker(){
		this.connection = {};
	}
	Tracker.prototype.track = function(type, ad){
		
		var event = new Event({
			type: 'impression', // should be required just in tracker server
			ad_id: ad.id,
			browser: 'firefox',
			campaign_id: 'skyelivre',
			page_url: 'http://adlayer.com.br',
			site_id: 'site123',
			page_id: 'page124',
			space_id: 'space123'
		});
	
		var opts = copy(api.config.url.tracker);
		opts.host = opts.host;
		opts.path = '/' + type + '/' + ad.id;
		
		//  validate in client is necessary ? or is it just slow
		if( event.validate() ){
			opts.qs = event;
			var req = request().get(opts, function(err, data){
				console.log(data);
			});
			this.connection.next(req);
		};
	};
	// Tracker instance
	var tracker = new Tracker();
	tracker.connection = connections.tracker;
	
	
	// Page api	
	api.page = new Page({id: 'f66458ae7be6306d7dd2ab99b002b5ef'});
	api.page.getData(function(err, data){
		if(data && data.spaces){
			api.page.scanSpaces(data.spaces, function(err, space){
				if(!err){
					space = spaces.create(space);
					var ad = ads.create(space.getRandomAd());
					
					ad.on('load', function(){
						tracker.track('impression', ad);
					});

					space.placeAd(ad);
				}
			});
		}
	});
	
	// Space api
	api.space = {};
	
	// Ad api
	api.ad = {};

})(this);