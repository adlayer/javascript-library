/**
* @module dom
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
	* @extends Ad
	* @extends DomElement
	*/
	var AdDom = function(){
		// extends Ad
		Ad.apply(this, arguments);
		
		/**
		* Instance of tracker
		* @property tracker
		* @type tracker
		* @public
		*/
		this.tracker = {};
	};
	// extends DomElement
	AdDom.prototype = new DomElement();
	
	
	/**
	* @method getSpaceId
	* @returns {String} return the id of the first parent div
	*/
	AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
	
	/**
	* @method getClickTag
	* @param {String} site_id
	* @param {String} page_id
	* @param {String} page_url
	* @returns {String} the full url to track this link
	* @example http://tracker.adlayerapp.com/click/10?&campaign_id=1235&link=http://www.adlayer.com.br
	*/
	AdDom.prototype.getClickTag = function(site_id, page_id, page_url ){
		// Tracker url
		var trackerUrl = this.tracker.connection.getUrl();

		var event = new Event({
			type: 'click',
			campaign_id: this.campaign_id,
			space_id: this.getSpaceId(),
			site_id: site_id,
			page_id: page_id,
			page_url: page_url,
			link: this.link
		});

		if( event.validate() && this.link ){
			var url = [trackerUrl, 'click', this.id].join('/');
			url = url + '?' + event.toQuery();
			return url;
		}
		return false;
	};
	
	/**
	* @method init
	* @param {Object} space
	* @param {Object} config
	* @param {String} page_url
	*/
	AdDom.prototype.init = function(space, config){
		var ad = this;
		// Listener for 'LOAD' event
		ad.on('load', function(){

			ad.tracker.track({
				type: 'impression',
				
				site_id: config.site_id,
				domain: config.domain,
				page_url: config.page_url,
				page_id: config.page_id,
				
				ad_id: ad.id,
				campaign_id: ad.campaign_id,
				space_id: space.id
			});
		});

		// Listener for 'PLACEMENT' event
		ad.on('placement', function(){
			// Setting click tag in ad element
			var clickTag = ad.getClickTag(config.site_id, config.page_id, config.page_url);
			ad.element.href = clickTag;
		});
		return ad;
	};
	
	exports.AdDom = AdDom;
	
	
	
})();