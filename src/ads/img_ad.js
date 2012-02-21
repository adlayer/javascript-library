/**
 * @class ImgAd
 * @param id
 * @param href
 * @param src
 * @return {string}
 */
var ImgAd = function(id, src, href, width, height, rel){
	var HtmlTag = require('../html/html_tag').html_tag;
	var Ad = require('./ad').ad;
	var EventEmitter = require('./node_modules/events').events.EventEmitter;
	var AnchorTag = require('../html/anchor_tag').anchor_tag;
	var Click = require('../models/click').Click;
	var ImgTag = require('../html/img_tag').img_tag;
	var Impression = require('../models/impression').Impression;
	
	HtmlTag.apply(this,arguments);
	Ad.apply(this, arguments);
	EventEmitter.apply(this,arguments);
	
	this.id = id;
	this.file = src;
	this.link = href;
	this.width = width;
	this.height = height;
	this.campaign = rel;
	
	var __construct = (function(_self){
		var anchor = new AnchorTag(id, _self.clickTag(), rel);
		_self.element = anchor;
		
		_self.on("click",function(){
			var click = new Click();
			click.ad_id = anchor.id;
			click.campaign_id = anchor.parentNode.rel;
			click.space_id = anchor.parentNode.id;
			click.save();
		});
		_self.addEventListener("click",function(){
			return _self.emit("click");
		});
		
		var img = new ImgTag(src);
		_self.on("load",function(){
			var print = new Impression();
			print.ad_id = img.parentNode.id;
			print.campaign_id = img.parentNode.rel;
			print.space_id = img.parentNode.parentNode.id;
			print.save();
		});
		img.onload = function(){
			return _self.emit("load");
		};
		anchor.appendChild(img);
		Ad.ads[anchor.id] = _self;
		return _self.element;
	})(this);
	return this.element;
};
exports.img_ad = ImgAd;