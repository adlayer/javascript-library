/**
 * @class IMGRequest
 * @implements HttpRequest
 * @classDescription Make an http request expeting for img return
 * @param {String} url
 * @param {Object} queries
 * @param {Function} callback
 */
var IMGRequest = function(url, queries, callback){
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
		var imgReq = document.createElement("img");
		imgReq.src = url + '?' + queryString.stringfy(this.queries);
		imgReq.onload = function () {
			if(callback){callback();}
		};
		return this;
	};
};
exports.img_request = IMGRequest;