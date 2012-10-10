(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	
	/**
	* Create embedable ads
	*
	* @class EmbedAd
	* @constructor
	* @param {Object} attributes
	* @extends AdDom
	* @extends Swf
	*/
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.getSrc();
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			self.element.setAttribute('type', self.type);
			self.element.setAttribute('allowScriptAccess', self.allowScriptAccess);
			self.element.setAttribute('allowNetworking', self.allowNetworking);
			self.element.setAttribute('menu', self.menu);
			self.element.setAttribute('wmode', self.wmode);
			self.element.setAttribute('scale', self.scale);
			self.element.setAttribute('quality', self.quality);
			
//			self.setAttributes(self);
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();