/**
* @module ads
*/

(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	/**
	* @class ImgAd
	* @extends AdDom
	*/
	var ImgAd = function(){
		AdDom.apply(this, arguments);
		
		var __construct = (function(self){
			// Default create the image
			self.create('img');
			self.element.src = self.src;
			var img = self.element;
			
			// Set id in the image or in the link wrapper
			self.element.id = self.id;
			self.addDomEventListener('load', function(){
				self.emit('load');
			});
			
			if(self.link){
				// subscribe img with link
				self.create('a');
				self.element.href = self.link;
				
				self.on('placement', function(){
					// Setting click tag in ad element
					var clickTag = self.getClickTag(self.impression);
					self.element.href = clickTag;
				});
				
				self.append(img);
				self.element.onclick = function(){
					window.open(self.element.href);
					return false;
				}
			}
			
			self.element.style.height = self.height + 'px';
			self.element.style.width = self.width + 'px';
			self.element.setAttribute('height', self.height);
			self.element.setAttribute('width', self.width);
			
			return self.element;
		})(this);
	};
	ImgAd.prototype = new AdDom();
	exports.ImgAd = ImgAd;
})();