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
	var ObjectTag = require('../html/flash/object_tag').ObjectTag;
	var EmbedTag = require('../html/flash/embed_tag').EmbedTag;
	var connection = require('../../connections').connections;

	Ad.apply(this, arguments);

	this.campaign_id = campaign;	
	this.id = id;
	this.file = file;
	this.element = {};
	
	/** 
	* @public
	* @return {String}
	*/
	this.getSrc = function(){
		var preloaderUrl = connection['static'].getUrl() + '/lib/as3.swf';
		var query = queryString.stringify({
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
		
		_self.on("load", function(){
			var print = new Impression();
			print.campaign_id = _self.campaign_id;
			print.space_id = _self.element.parentNode.id;
			print.ad_id = _self.id;
			print.save();
		});
		/**
		* @todo do it outside e.g 
		* var ad = new Ad('123');
		* ads[ad.id] = ad;
		*/
		Ad.ads[_self.id] = _self;
		
	})(this);
	return this.element;
};

exports.swf_ad = SwfAd;