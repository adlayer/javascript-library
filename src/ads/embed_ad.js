/**
* Create embedable ads
*
* @class EmbedAd
* @constructor
* @param {Object} attributes
*
* @augments AdDom
* @property {String} id Id of ad
* @property {String} name Name of ad creative
* @property {String} campaign_id Id to campaign that belongs to
* @property {String} type Ad type
* @property {String} file Path to ad file
* @property {String} link destiny link
* @property {Boolean} status Ad status
* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
*
*/
(function(){
	/*
	* @class Swf
	* @property {String} align Alignment of html content.
	* @property {Boolean} menu Control right click menu options (true, false).
	* @property {String} quality Control quality of loaded movie ('low', 'medium', 'high').
	* @property {String} scale Flash canvas mode ('noscale').
	* @property {String} wmode Embed type relative to context.
	* @property {String} type Default alias for 'application/x-shockwave-flash'.
	* @property {String} type allowScriptAcess.
	*/
	var Swf = function(){
		this.align = "center";
		this.menu = false;
		this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
		this.scale = "noscale"; //default,noborder,exactfit,noscale
		this.wmode = "transparent"; //window,opaque,transparent
		this.type = "application/x-shockwave-flash";
		this.allowScriptAccess = "always"; // "always", "sameDomain", and "never".
		//this.allowNetworking = "all";
	};
	
	var AdDom = require('../dom/ad_dom').AdDom;
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.src;
			
			self.setAttributes(new Swf());
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();