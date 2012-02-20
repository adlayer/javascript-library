/**
 * @class JSONPRequest
 * @implements HttpRequest
 * @classDescription Make an http request expeting for jsonp return
 * @param {String} url
 * @param {Object} queries
 * @param {Function} callback
 */
var JSONPRequest = function(url, queries, callback, error){
	var queryString = require('../node_modules/querystring').querystring;
	var loadScript = require('../utils/loadscript').loadscript;
	var HttpRequest = require('./http_request').http_request;
	HttpRequest.apply(this, arguments);

	this.url = url;
	this.id = '';
	this.queries = queries || {};
	this.callback = callback;
	
	this.setId = function(id){
		this.id = id;
		return this;
	};
	
	this.send = function(){
		queries.callback = 'adlayer.connections.page.requests.' + this.id + '.callback';
		var str = queryString.stringfy(this.queries);
		var resource = loadScript(this.url + '?' + str, undefined, error);
		return this;
	};
};
exports.jsonp_request = JSONPRequest;