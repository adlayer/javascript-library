/**
 * @class Ad
 * @extends {Format}
 * @param {string} id
 */
(function(){
	
	var Format = require('../format').format;
	
	var Ad = function(){
		var EventEmitter = require('../node_modules/events').events.EventEmitter;
		var configs = require('../configs').configs;
		var Impression = require('../models/impression').Impression;
		var Click = require('../models/click').Click;
		
		// Inherits from Event emitter
		EventEmitter.apply(this, arguments);
		
		this.name = "";
		this.campaign_id = "";
		
		/*	@property {string} link */
		this.link			=	"";
		/*	@property {string} id Id of ad in DOM and couchdb */
		this.id				=	"";
		/**
		* @property	{object}	alternative	Properties	of	alternative	ad
		* @deprecated just in next version
		**/
		this.alternative	=	"";
		/**
		* @public
		* @property {string} file Link to external location of ad
		**/
		this.file			=	"";
	
		this.setSpaceInLink = function(id){
			throw "Should subscribe it";
		};
		
		this.clickTag = function(){
			var protocol = 'http:';
		
			var url = protocol + '//' + configs.tracker.host + ':' + configs.tracker.port;
			url += "/click";
			url += "/" + this.id;
		
			var data = new Click();
			delete data.save;
			data.campaign_id = this.campaign;
			data.link = this.link;
			url += "?" + queryString.stringfy(data);
			return url;
		};

	};
	// Inherits from format
	Ad.prototype = new Format();


	/** @static **/

	Ad.ads = {};
	Ad.getAd = function(id){
		return Ad.ads[id];
	};
	exports.ad = Ad;
})();