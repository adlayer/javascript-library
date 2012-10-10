(function(){
	
	// modules
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	var ads = require('../ads/ads').ads;

	/**
	* Basic Space
	*
	* @class BasicSpace
	* @extends DomElement
	*/
	var BasicSpace = function(){
		// extends Space
		SpaceDom.apply(this, arguments);
		
		this.placements = {};
		// Current ad
		this.ad = {};
	};
	// extends DomElement
	BasicSpace.prototype = new SpaceDom();

	BasicSpace.prototype.init = function(tracker, config){
		if(this.ads && this.ads.length > 0){
			var ad = ads.create(this.getAd());
			ad.tracker = tracker;
			ad = ad.init(this, config);

			// Placing ad in space
			this.placeAd(ad);
			return this;
		}
	};
	
	exports.BasicSpace = BasicSpace;
})();