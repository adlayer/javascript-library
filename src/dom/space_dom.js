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
		// Current ad
		this.ad = {};
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
		this.ad = ad;
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
