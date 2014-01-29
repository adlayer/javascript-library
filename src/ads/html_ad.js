/**
* @module ads
*/

(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	/**
	* @class ImgAd
	* @extends AdDom
	*/
	var HtmlAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('iframe');
			self.element.src = self.src;
			var iframe = self.element;
			
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			self.addDomEventListener('load', function(){
				self.emit('load');
			});
			
			self.element.style.height = self.height + 'px';
			self.element.style.width = self.width + 'px';
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			
			return self.element;
		})(this);
	};
	HtmlAd.prototype = new AdDom();
	exports.HtmlAd = HtmlAd;
})();