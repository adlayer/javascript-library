/**
* Create embedable ads
*
* @class EmbedAd
* @constructor
* @param {Object} attributes
*
* @augments AdDom
* @property {String} id Id of ad
* @property {String} name Name of ad creative
* @property {String} campaign_id Id to campaign that belongs to
* @property {String} type Ad type
* @property {String} file Path to ad file
* @property {String} link destiny link
* @property {Boolean} status Ad status
* @property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
*
*/
(function(){
	var AdDom = require('../dom/ad_dom').AdDom;
	var Swf = require('./swf').Swf;
	var EmbedAd = function(){
		AdDom.apply(this, arguments);
		Swf.apply(this, arguments);
		
		var __construct = (function(self){
			self.create('EMBED');
			self.element.src = self.src;
			
			self.setAttributes(new Swf());
			
			self.element.id = self.id;
			return self.element;
		})(this);
	};
	EmbedAd.prototype = new AdDom();
	exports.EmbedAd = EmbedAd;
})();