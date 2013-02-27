/**
* @module ads
*/
(function(){
	
	exports.ads = (function(){
		var FlashAd = require('./flash_ad.js').EmbedAd;
		var Img = require('./img_ad.js').ImgAd;
		
		return {
			create: function(data){
				// mixin
				data.id = data._id || data.id;
				data.src = data.file;
				delete data.file;
				delete data._id;
				
				switch(data.type){
					case 'flash':
						data.preloader = 'http://xframe.adlayerjavascriptsdk.com.s3.amazonaws.com/as3.swf';
						data.callback = 'adlayer.markAdAsLoaded';
						return new FlashAd(data);
					case 'image':
						return new Img(data);
				}
			}
		};
	})();
	
})();