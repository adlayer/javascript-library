/**
* @module dom
*/

/**
* Abstract class for dom/html elements 
*
* @class DomElement
* @link https://developer.mozilla.org/en/DOM/element
*/
var DomElement = function(){
	/**
	* Id attribute of object
	* @property id
	* @type string
	*/
	this.id = '';
	/**
	* Dom element itself
	* @property element
	* @type object
	*/
	this.element = undefined;
};

	/**
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @static
	* @returns {Object} element
	*/
	DomElement.create = function(tagName, document){
		return document.createElement(tagName);
	};
	/**
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.create = function(tagName, document){
		//	file global || adlayer js module wrapper || passed document context
		document = this.document || global.document || document;
		this.element = DomElement.create(tagName, document);
		return this.element;
	};
	
	/**
	* @method setAttributes
	* @param {Object} attributes
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.setAttributes = function(attributes){
		var merge = require('../utils/merge').merge;
		merge(this.element, attributes);
	};
	
	/**
	* @method append
	* @param {Object} child
	* @public
	* @returns {Object} this - Chainable method
	*/
	DomElement.prototype.append = function(child){
		this.element.appendChild(child);
		return this;
	};
	/**
	* @method findParentTag
	* @param {String} tag UPPERCASE tag name
	* @public
	* @returns {Object} parentElement
	*/
	DomElement.prototype.findParentTag = function(tag){
		var parent = this.element.parentNode;
		while(parent.nodeName != tag){
			parent = parent.parentNode;
		}
		return parent;
	};
	/**
	* @method addDomEventListener
	* @param {String} type Event name like 'click', 'load', 'mouseover'
	* @param {Function} eventListener Callback for event trigger
	* @public
	* @returns {Object} return this to allow chainability
	*/
	DomElement.prototype.addDomEventListener = function(type, eventListener){
		if(typeof addEventListener === 'function'){
			this.element.addEventListener(type, eventListener, false);
		} else if(typeof attachEvent === 'function'){
			this.element.attachEvent('on' + type, eventListener);
		} else {
			this.element['on' + type] = eventListener;
		}
		return this;
	};


	exports.DomElement = DomElement;
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
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Space = require('../domain/space').Space;
	
	/**
	* Space dom
	*
	* @class SpaceDom
	* @extends DomElement
	* @requires Ad
	*/
	var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
		
		this.placements = {};
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();

	/**
	* @method placeAd
	* @param {Object} DomElement Ad to append in element
	* @returns {Object} return this to chain methods
	*/
	SpaceDom.prototype.placeAd = function(ad){
		this.element.appendChild(ad.element);
		ad.emit('placement');
		return this;
	};
	
	/**
	* @method getElement
	* @returns {Object} return the DomElement
	*/
	SpaceDom.prototype.getElement = function(){
		return this.document.getElementById(this.id);
	};
	
	exports.SpaceDom = SpaceDom;
})();