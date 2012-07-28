/**
* @todo: switch for IE use object tag
* @todo: change write data different to avoid _id & file atribution
*/
(function(){
	
	exports.ads = (function(){
		var FlashAd = require('./flash_ad.js').EmbedAd;
		var Img = require('./img_ad.js').ImgAd;
		
		return {
			create: function(data){
				// mixin
				data.id = data._id;
				data.src = data.file;
				delete data.file;
				delete data._id;
				
				switch(data.type){
					case 'flash':
						return new FlashAd(data);
					case 'image':
						return new Img(data);
				}
			}
		};
	})();
	
})();