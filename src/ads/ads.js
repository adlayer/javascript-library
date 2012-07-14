(function(){
	
	exports.ads = (function(){
		return {
			Embed: require('./embed_ad.js').EmbedAd,
			Object: require('./object_ad.js').ObjectAd,
			Img: require('./img_ad.js').ImgAd
		}
	})();
	
})();