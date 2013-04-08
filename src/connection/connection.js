/**
* @module connection
*/

/**
* @class Connection
* @constructor
* @extends Http
*/
var Connection = function( attributes ){
	var Http = require('../request/http').Http;
	Http.apply(this, arguments);
	
	/**
	* Index of requests
	* @property _index
	* @type number
	* @protected
	*/
	this._index = 0;
	/**
	* Connection name
	* @property name
	* @type string
	*/
	this.name = '';
	/**
	* Requests storage
	* @property requests
	* @type object
	*/
	this.requests = {};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		if( typeof attributes === 'string' ){
			self.url = attributes;
		} else {
			self = self.extend(attributes);
		}
	}(this);
};

/**
* @method id
* @public
* @return {String} return current uuid
*/
Connection.prototype.id = function(){
	return 'n' + this._index;
};

/**
* @method newId
* @public
* @return {String} Increment the index and return a new id
*/
Connection.prototype.newId = function(){
	this._index++;
	return this.id();
};

/**
* @method next
* @public
* @param {Object} req A Request instance
*/
Connection.prototype.next = function(req){
	var sign = this.newId();
	this.requests[sign] = req;
};
/**
* @method getCallbackPath
* @public
* @return {String} path of callback
*/
Connection.prototype.getCallbackPath = function(){
	return [this.name, 'requests', this.id(), 'callback'].join('.');
};
/**
* @method request
* @public
* @return {Object}
*/
Connection.prototype.request = require('../request/request').request;
/**
* @method get
* @public
* @return {Object}
*/
Connection.prototype.get = function(path, data, callback){
	if(typeof data === 'function') {
		callback = data;
	}
	
	// get callback path and asign as callcack querystring;
	data.callback = this.getCallbackPath();
	
	this.path = path;
	this.qs = data;
	
	// Allocate request id namespace
	this.requests[this.id()] = {};
	
	// Make a get request
	this.request().get(this, callback);
	
	// Increment id for the next
	this.newId();
	
	return this;
};
exports.Connection = Connection;