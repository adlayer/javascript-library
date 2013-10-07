/**
* @module dom
* @requires core, events
*/
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Ad = require('../domain/ad').Ad;
	var Event = require('../domain/event').Event;
	
	
	/**
	* Base for any type of Dom ads.
	*
	* @class AdDom
	* @constructor
	* @extends DomElement
	* @uses Ad
	*/
	var AdDom = function(){
		Ad.apply(this, arguments);

		/**
		* Url base of tracker
		* @property trackerUrl
		* @type string
		* @public
		*/
		this.trackerUrl = null;
		
		/**
		* Information about the ad impression
		* @property impression
		* @type string
		* @public
		*/
		this.impression = {};

	};
	// extends DomElement
	AdDom.prototype = new DomElement();
	
	/**
	* @method getSpaceId
	* @return {String} return the id of the first parent div
	*/
	AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
	
	/**
	* @method setImpression
	* @param {Object} space
	* @param {Object} config
	* @example
		var config = {
			type: 'impression',
			
			site_id: config.site_id,
			domain: config.domain,
			page_url: config.page_url,
			page_id: config.page_id,
			
			ad_id: ad.id,
			campaign_id: ad.campaign_id,
			space_id: space.id
		}
		new AdDom(space, config);
	*/
	AdDom.prototype.setImpression = function(space, config){
		config.type = 'impression';
		config.ad_id = this.id;
		
		if(space){
			config.space_id = space.id || delete config.space_id;
		}
		
		config.campaign_id = this.campaign_id;
		this.impression = config;
		return this.impression;
	};
	
	/**
	* @method getClickTag
	* @param {Object} config
	* @return {String} the full url to track this link
	* @example http://tracker.adlayerapp.com/click/10?&campaign_id=1235&link=http://www.adlayer.com.br
	*/
	AdDom.prototype.getClickTag = function(config){
		// Tracker url
		var trackerUrl = this.trackerUrl;
		
		var event = new Event({
			ad_id: this.id,
			type: 'click',
			campaign_id: this.campaign_id,
			space_id: this.getSpaceId(),
			site_id: config.site_id,
			page_id: config.page_id,
			page_url: config.page_url,
			link: escape(this.link)
		});

		if( event.validate() && this.link ){
			var url = [trackerUrl, 'click', this.id].join('/');
			url = url + '?' + event.toQuery();
			return url;
		}
		return false;
	};
	
	exports.AdDom = AdDom;
	
	
	
})();