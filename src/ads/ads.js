/**
* Handle all supported ad types (flash and image)
*
* @module ads
* @main
* @example
	var ads = require('./src/ads/ads').ads;
	ads.create({type: 'flash'});
*/
(function(){
	
	exports.ads = (function(){
		var FlashAd = require('./flash_ad.js').EmbedAd;
		var Img = require('./img_ad.js').ImgAd;
		
		return {
			/**
			* @method create
			* @param {Object} data Config to create the ad
			*/
			create: function(data){
				// mixin
				data.id = data._id || data.id;
				data.src = data.file;
				delete data.file;
				delete data._id;
				
				switch(data.type){
					case 'flash':
						data.preloader = 'http://xframe.adlayerjavascriptsdk.com/main.swf';
						//data.preloader = 'http://localhost/xframe/main.swf';
						data.callback = 'adlayer.markAdAsLoaded';
						return new FlashAd(data);
					case 'image':
						return new Img(data);
				}
			}
		};
	})();
	
})();