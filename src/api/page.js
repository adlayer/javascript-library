/**
* @module api
*/
(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Page = require('../domain/page').Page;
	var request = require('../request/request').request;
	var spaces = require('../spaces/spaces').spaces;
	
	/**
	* @class PageApi
	* @constructor
	* @extends Page
	* @extends EventEmitter
	*/			
	var PageApi = function(){
		Page.apply(this, arguments);
		EventEmitter.apply(this, arguments);
		
		this.document;
		this.tracker;
		this.connection;
	};
	
	/**
	* @method getData
	* @param {Function} callback
	*/
	PageApi.prototype.getData = function(callback){
		var sign = this.connection.id();
		var opts = copy(this.connection);
		opts.host = opts.host;
		opts.path = '/pages/' + this.id;
		opts.qs = {
			callback: 'adlayer.connections.adserver.requests.' + sign + '.callback',
			domain: this.domain,
			site_id: this.site_id,
			ads_per_space: this.adsPerSpace
		};
		var req = request().get(opts, callback);
		this.connection.requests[sign] = req;
		
	};
	
	/**
	* @method scanSpaces
	* @param {Function} collection
	* @param {Function} callback
	*/
	PageApi.prototype.scanSpaces = function(collection, callback){

		for( var i = 0; i < collection.length; i++ ){
			var space = collection[i];
			space.document = this.document;
			space = spaces.create(collection[i]);
			space.element = space.getElement();
			
			if ( space.element ){
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
	
	exports.PageApi = PageApi;
})();