(function(global){
	var request = require('../request/request').request;
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
	var test = copy(api.config);

	// Connections
	api.connections = {
		adserver: new Connection(api.config.url.adserver),
		tracker: new Connection(api.config.url.tracker)
	};

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
	
	// Page api	
	api.page = new Page({id: 'f66458ae7be6306d7dd2ab99b002b5ef'});
	api.page.getData(function(err, data){
		if(data && data.spaces){
			api.page.scanSpaces(data.spaces, function(err, space){
				if(!err){
					space = spaces.create(space);
					var ad = ads.create(space.getRandomAd());

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