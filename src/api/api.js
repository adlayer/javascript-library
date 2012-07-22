(function(global){
	var copy = require('../utils/copy').copy;
	var Connection = require('../connection/connection').Connection;
	var Page = require('./page').PageApi;
	var Tracker = require('./tracker').Tracker;
	var config = require('../config/config').config;
	
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

	// todo: back getSpaces to this file in order to be able to export api.spaces and api.ads
	// Page api	
	var page = new Page({
		id: 'f66458ae7be6306d7dd2ab99b002b5ef',
		connection: connections.adserver,
		tracker: tracker,
		document: {} // document
	});
	//page.init();
	
	
	// Page api
	api.page = page;
	
	// Connections api
	api.connections = connections;
	
	// Space api
	api.spaces = {};
	
	// Ad api
	api.ads = {};
	
})(this);