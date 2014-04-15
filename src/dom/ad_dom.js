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
	* @method isVisible
	*/
	AdDom.prototype.isVisible = function(){
		//IE 5 does not support
		//http://reference.sitepoint.com/javascript/Node/ownerDocument
		var document = this.element.ownerDocument;
		
		//http://stackoverflow.com/questions/10173236/window-innerheight-ie8-alternative
		var doc = {
			top: document.body.scrollTop || document.documentElement.scrollTop,
			left: document.body.scrollLeft || document.documentElement.scrollLeft,
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth
		};
		
		var element = {
			top: this.element.offsetTop,
			left: this.element.offsetLeft,
			height: this.element.offsetHeight,
			width: this.element.offsetWidth,
			style: document.defaultView.getComputedStyle(this.element, null)
		}
		
		element.halfHeight = element.height/2;
		element.halfWidth = element.width/2;

		var horizontalVisible = ((element.left + element.halfWidth) <= doc.width) && ((element.left + element.halfWidth) >= doc.left) && (element.left >= 0);
		var verticalVisible = ((element.top + element.halfHeight) <= doc.height) && ((element.top + element.halfHeight) >= doc.top) && (element.top >= 0);
		var display = true;
		var visibility = true;
		if(element.style){
			display = element.style.display != 'none';
			visibility = element.style.visibility != 'hidden';
		}
		var result = (horizontalVisible && verticalVisible && display && visibility);
		return result;
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
		//IE 5 does not support
		//http://reference.sitepoint.com/javascript/Node/ownerDocument
		var document = this.element.ownerDocument;
		//http://stackoverflow.com/questions/10173236/window-innerheight-ie8-alternative
		var doc = {
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth
		};
		
		var horizontalVisible = (this.element.offsetLeft <= doc.width) && (this.element.offsetLeft >= 0);
		var verticalVisible = (this.element.offsetTop <= doc.height) && (this.element.offsetTop >= 0);
	
		config.visible = this.isVisible();
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