/**
* @class Connection
*/

/**
	## Using in node.js
	
	// hack request
	var request = require('request');
	request.jsonp = request.get;
	
	// Hacking lib.connection
	var connection = require('connection');
	connection.prototype.request = request;
	
	// Your code goes here	

**/

var Connection = function( attributes ){
	var Http = require('../request/http').Http;
	Http.apply(this, arguments);
	
	this._index = 0;
	
	this.name = '';
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

Connection.prototype.id = function(){
	return 'n' + this._index;
};

Connection.prototype.newId = function(){
	this._index++;
	return this.id();
};

Connection.prototype.getCallbackPath = function(){
	return [this.name, 'requests', this.id(), 'callback'].join('.');
};

Connection.prototype.request = require('../request/request').request;

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
	this.request().get(this, callback).expose(this.requests[this.id()]);
	
	// Increment id for the next
	this.newId();
	
	return this;
};
exports.Connection = Connection;