/**
 * @class ImgAd
 */
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		
		this.align = "center";
		this.name = this.id;

		this.menu = false;
		this.quality = "high"; //low,autolow,autohigh,medium,high,best ;
		this.scale = "noscale"; //default,noborder,exactfit,noscale
		this.wmode = "transparent";//window,opaque,transparent
		this.type = "application/x-shockwave-flash";
		this.allowScriptAccess = "always";// "always", "sameDomain", and "never".
		//this.allowNetworking = "all";
		this.link = "";
		
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.src;
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			console.log(self);
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();