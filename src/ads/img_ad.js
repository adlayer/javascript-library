/**
 * @class ImgAd
 */
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var ImgAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('img');
			self.element.src = self.src;
			
			if(self.link){
				var img = self.element;
				// subscribe img with link
				self.create('a');
				self.element.href = self.link;
				self.append(img);
			}
			
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	ImgAd.prototype = new AdDom();
	exports.ImgAd = ImgAd;
})();