/**
* @connections
*/

(function(){
	var ConnectionsManager = require('./connection/connection_manager').connection_manager;
	ConnectionsManager = ConnectionsManager.getInstance();

	var configs = require('./configs').configs;

	ConnectionsManager.create('static', configs.sdk);
	ConnectionsManager.create('page', configs.jocasta);
	ConnectionsManager.create('impressions', configs.tracker);
	
	exports.connections = ConnectionsManager.connections;
})();