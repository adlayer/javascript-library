/**
* @module ads
*/
(function(){
	var Embed = require('./embed_ad.js').EmbedAd;
	var ObjectAd = require('./object_ad.js').ObjectAd;
	/**
	* @class FlashAd
	* @constructor
	*/
	var FlashAd = function(data){
		/**
		* @method __construct
		* @private
		*/
		var __construct = (function(self){
			if(self.browser){
				return new ObjectAd(data);
			} else {
				return new Embed(data);
			}

		})(this);
		return __construct;
	};
	exports.FlashAd = FlashAd;
})();