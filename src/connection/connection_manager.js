/**
 * @class ConnectionsManager
 * @classDescription Singleton for access and control all connections
 */
(function(){
	var Connection = require('./connection').connection;
	var ConnectionsManager = function(){
		this.total = 0;
		this.connections = {};
	};
	/** @public **/
	ConnectionsManager.prototype.get = function(name){
		return this.connections[name];
	};
	/** @public **/
	ConnectionsManager.prototype.create = function(name, options){
		this.total++;
		this.connections[name] = new Connection(name, options);
		return this.connections[name];
	};

	/** @static **/
	ConnectionsManager.instance = undefined;

	/** @static **/
	ConnectionsManager.getInstance = function(){
		if( ConnectionsManager.instance ){
			return ConnectionsManager.instance;
		}
		return new ConnectionsManager();
	};
	exports.connection_manager = ConnectionsManager;
})();