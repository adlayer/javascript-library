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
	* @param {Object} config
	* @returns {String} the full url to track this link
	* @example http://tracker.adlayerapp.com/click/10?&campaign_id=1235&link=http://www.adlayer.com.br
	*/
	AdDom.prototype.getClickTag = function(config){
		// Tracker url
		var trackerUrl = this.tracker.connection.getUrl();

		var event = new Event({
			ad_id: this.id,
			type: 'click',
			campaign_id: this.campaign_id,
			space_id: this.getSpaceId(),
			site_id: config.site_id,
			page_id: config.page_id,
			page_url: config.page_url,
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
	*/
	AdDom.prototype.init = function(space, config){
		var ad = this;
		
		/**
		{
			type: 'impression',
			
			site_id: config.site_id,
			domain: config.domain,
			page_url: config.page_url,
			page_id: config.page_id,
			
			ad_id: ad.id,
			campaign_id: ad.campaign_id,
			space_id: space.id
		}
		**/
		config.ad_id = ad.id;
		
		config.space_id = space.id;
		config.space_id || delete config.space_id;
		
		config.campaign_id = ad.campaign_id;
		
		// Listener for 'LOAD' event
		ad.on('load', function(){

			config.type = 'impression';
			ad.tracker.track(config);
			
		});

		// Listener for 'PLACEMENT' event
		ad.on('placement', function(){
			// Setting click tag in ad element
			var clickTag = ad.getClickTag(config);
			ad.element.href = clickTag;
		});
		return ad;
	};
	
	exports.AdDom = AdDom;
	
	
	
})();