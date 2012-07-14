(function(global){
	var request = require('../request/request').request;
	var Connection = require('../connection/connection').Connection;
	var Page = require('../domain/page').Page;
	
	
	// Extend or define Adlayer
	global.adlayer = global.adlayer || {};

	var api = global.adlayer;
	
	// Configs
	api.config = api.config || {
		url: {
			adserver: {
				host: 'couchdb'
			},
			tracker: {
				host: 'dev.tracker.adlayerapp.com'
			}
		}
	};
	
	// Connections
	api.connections = {
		adserver: new Connection(api.config.url.adserver)
	};

	
	Page.prototype.getData = function(callback){
		
		var sign = api.connections.adserver.newId();
		var opts = api.config.url.adserver;
		opts.path = '/pages/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback'
		};
		api.connections.adserver.requests[sign] = request().get(opts, callback);
		
	};
	
	// Page api	
	api.page = new Page({id: 'f66458ae7be6306d7dd2ab99b002b5ef'});
	api.page.getData(function(err, data){
		if(data && data.spaces){
			// Don't use foreach for old browsers
			for( var i = 0; i <  data.spaces.length; i++ ){		
				console.log(new Space(data.spaces[i]));
			}
		}
	});
	// Space api
	api.space = {};
	
	// Ad api
	api.ad = {};

})(this);