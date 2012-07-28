/**
* @todo: switch for IE use object tag
* @todo: change write data different to avoid _id & file atribution
*/
(function(){
	var Embed = require('./embed_ad.js').EmbedAd;
	var ObjectAd = require('./object_ad.js').ObjectAd;
	var FlashAd = function(data){
		var __construct = (function(self){
			switch(self.browser){
				case 'msie':
					return new Object(data);
				default :
					return new Embed(data);
			}
		})(this);
		return __construct;
	}
	exports.FlashAd = FlashAd;
})();