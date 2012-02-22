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
	var queryString = require('../../node_modules/querystring').querystring;
	var Ad = require('./ad').ad;
	var ObjectTag = require('../html/flash/object_tag').object_tag;
	var EmbedTag = require('../html/flash/embed_tag').embed_tag;
	var connection = require('../../connections').connections;

	Ad.apply(this, arguments);
	
	
	this.file = file;
	this.element = {};
	/** 
	* @public
	* @return {String}
	*/
	this.getSrc = function(){
		var preloaderUrl = connection['static'].getUrl() + '/lib/as3.swf';
		var query = queryString.stringfy({
			"src":this.file,
			"ad_id":this.id,
			"link":this.link
		});
		return preloaderUrl + "?" +query;
	};
	
	var __construct = (function(_self){
		
		if(browser.msie){
			_self.element = new ObjectTag(id, _self.getSrc(), link, width, height, campaign);
		} else{
			_self.element = new EmbedTag(id, _self.getSrc(), link, width, height, campaign);
		}
		
		// exporting this instance to ads namespace
		//todo: remove this from this place to work in node
		Ad.ads[_self.id] = _self;
	})(this);
	return this.element;
};
exports.swf_ad = SwfAd;