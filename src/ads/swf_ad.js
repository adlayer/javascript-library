/**
 * @class SwfAd
 * @todo: trazer os methods de log click e impressions pra essa classe
 * @pattern factory
 * @param id
 * @param file
 * @param link
 * @param width
 * @param height
 * @param campaign
 * @return {Object} HtmlTag
 */
var SwfAd = function(id,file,link, width,height,campaign){	
	var Ad = require('./ad').ad;
	Ad.apply(this, arguments);
	var EventEmitter = require('../../node_modules/events').events.EventEmitter;
	EventEmitter.apply(this, arguments);
	var connection = require('../../connections').connections;
	var Impression = require('../../models/impression').Impression;
	var queryString = require('../../node_modules/querystring').querystring;
	
	var ObjectTag = require('../html/flash/object_tag').object_tag;
	var EmbedTag = require('../html/flash/embed_tag').embed_tag;
	
	
	this.element = {};
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
		
		if(browser.msie){
			_self.element = new ObjectTag(id,file,link,width,height,campaign);
		} else{
			_self.element = new EmbedTag(id,file,link,width,height,campaign);
		}
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
	return this.element;
};
exports.swf_ad = SwfAd;