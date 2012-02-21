 /**
 * @class Flash
 * @extends HtmlTag
 * */
var Flash = function(id,src,link,width,height,rel){
	var HtmlTag = require('../html_tag').html_tag;
	var EventEmitter = require('../../node_modules/events').events.EventEmitter;
	HtmlTag.apply(this, arguments);
	EventEmitter.apply(this, arguments);
	
	var connection = require('../../connections').connections;
	var Impression = require('../../models/impression').Impression;
	var queryString = require('../../node_modules/querystring').querystring;
	
	this.id = id;
	this.rel = rel;
	this.src = src;
	this.height = height;
	this.width = width;
	this.align = "center";
	this.link = link;
	this.name = id;
	
	
	this.menu = false;
	this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
	this.scale = "noscale"; //default,noborder,exactfit,noscale
	this.wmode = "transparent";//window,opaque,transparent
	this.allowScriptAccess = "always";// "always", "sameDomain", and "never".
	//this.allowNetworking = "all";
	this.link = "";	
	
	/** 
	* @public
	* @return {String}
	*/
	this.getSrc = function(){
		var preloaderUrl = connection['static'].getUrl() + '/lib/as3.swf';
		var query = queryString.stringfy({
			"src":this.src,
			"ad_id":this.id,
			"link":this.link
		});
		return preloaderUrl + "?" +query;
	};
	
	var __construct = (function(_self){
		// todo: migrate this to class ad or swfAd
		_self.addListener("load", function(){
			var print = new Impression();
			print.campaign_id = _self.rel;
			print.space_id = _self.element.parentNode.id;
			print.ad_id = _self.id;
			print.save();
		});
		
		// exporting this instance to ads namespace
		//todo: remove this from this place to work in node
		Ad.ads[_self.id] = _self;
	})(this);
};
exports.flash = Flash;