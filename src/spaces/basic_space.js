/**
* @module spaces
* @requires dom, ads
*/

(function(){
	
	// modules
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	var ads = require('../ads/ads').ads;

	/**
	* Basic Space
	*
	* @class BasicSpace
	* @extends SpaceDom
	* @uses SpaceDom
	*/
	var BasicSpace = function(){
		// extends Space
		SpaceDom.apply(this, arguments);
	};
	// extending DomElement
	BasicSpace.prototype = new SpaceDom();

	/**
	* When there are ads fetched for this space, select some Ad 
	* from the fecthed collection using some configurable behaviour (Random by default).
	*
	* Create and initalize the seleted as an AdDom instance,
	* register the 'Load' event, in order to track the impression when the file is fully loaded.
	* Place the ad on the DomSpace, which will automatically trigger the 'Ad Placement' event.
	*
	* @method init
	* @param {Object} tracker A instance of Tracker
	* @param {Object} config Data to tracked
	* @public
	*/
	BasicSpace.prototype.init = function(tracker, config){
		if(this.ads && this.ads.length > 0){
			// Create an ad for space from 'this.ads' array, Selection made by behaviour by default will be random
			var ad = ads.create(this.getAd());
			ad.trackerUrl = tracker.connection.getUrl();
			
			var self = this;
			ad.on('load', function(){
				ad.setImpression(self, config);
				tracker.track(ad.impression);	
			});
			
			// Placing ad in space
			this.placeAd(ad);
		}
		return this;
	};
	
	exports.BasicSpace = BasicSpace;
})();