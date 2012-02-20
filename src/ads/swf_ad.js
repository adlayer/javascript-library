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
	
	var ObjectTag = require('../html/flash/object_tag').object_tag;
	var EmbedTag = require('../html/flash/embed_tag').embed_tag;
	
	this.element = {};
	var __construct = function(_self){
		if(browser.msie){
			_self.element = new ObjectTag(id,file,link,width,height,campaign);
		} else{
			_self.element = new EmbedTag(id,file,link,width,height,campaign);
		}

	}(this);
	return this.element;
};
exports.swf_ad = SwfAd;