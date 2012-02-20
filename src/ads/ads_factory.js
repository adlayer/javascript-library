/**
 * @constructor AdsFactory
 * @TODO: handle undefined file type
 */
var AdsFactory = function(){};

/**
 * @static
 * @param {Object} model
 * @return {Object} Ad
 */
AdsFactory.create = function(model){
	var ImgAd = require('./img_ad').img_ad;
	var SwfAd = require('./swf_ad').swf_ad;
	
	var type = model.type;
	switch(type){
		case "image":
			return new ImgAd(model._id,model.file,model.link,model.width,model.height,model.campaign_id);
	
		case "flash":
			return new SwfAd(model._id,model.file,model.link,model.width,model.height,model.campaign_id);
	}
};
exports.ads_factory = AdsFactory;