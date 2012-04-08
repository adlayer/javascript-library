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

var Connection = function(name, options){
	var index = 0;
	this.name = name;
	this.requests = {};

	this.protocol = options.protocol;
	this.host = options.host;
	this.port = options.port;
	this.path = options.path;
	
	this.getUrl = function(){
		var url = '';
		url += this.protocol + '://';
		url += this.host;
		url +=':' + this.port;
		
		this.url = url;
		return this.url;
	};
	
	this.request = function(){
		var JSONPRequest = require('../request/jsonp_request').jsonp_request;
		var IMGRequest = require('../request/img_request').img_request;
		var _self = this;
		var id = 'n' + index++;

		return {
			jsonp: function(path, queries, callback, error){
				var instance = new JSONPRequest( _self.getUrl() + path, queries, callback, error);
				instance.setId(id);
				instance.send();
				_self.requests[id] = instance;
				return _self.requests[id];
			},
			img: function(path, queries, callback, error){
				var instance = new IMGRequest(_self.getUrl() + path, queries, callback, error);
				instance.setId(id);
				instance.send();
				_self.requests[id] = instance;
				return _self.requests[id];
			}
		};
	};
};
exports.connection = Connection;