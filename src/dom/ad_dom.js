(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Ad = require('../domain/ad').Ad;
	var Event = require('../domain/event').Event;
	
	
	/*
	* @class
	* @requires DomElement
	* @requires Ad
	* @requires Event
	*/
	var AdDom = function(){
		// extends Ad
		Ad.apply(this, arguments);
		
	};
	// extends DomElement
	AdDom.prototype = new DomElement();
	
	
	/*
	* @public
	* @returns {String} return the id of the first parent div
	*/
	AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
	
	/*
	* @public
	* @param {String} tracker url
	* @param {String} site_id
	* @param {String} page_id
	* @param {String} page_url
	* @returns {String} the full url to track this link
	* @example http://tracker.adlayerapp.com/click/10?&campaign_id=1235&link=http://www.adlayer.com.br
	*/
	AdDom.prototype.getClickTag = function(tracker, site_id, page_id, page_url ){

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
			var url = [tracker, 'click', this.id].join('/');
			url = url + '?' + event.toQuery();
			return url;
		}
		return false;
	};
	exports.AdDom = AdDom;
	
})();