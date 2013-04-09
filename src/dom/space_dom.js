/**
* @module dom
* @requires spaces
*/
(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Space = require('../domain/space').Space;

	/**
	* Space dom
	*
	* @class SpaceDom
	* @extends Space
	* @uses Spaces
	*/
	var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
		
		/**
		* Hash of all placements during this pageview on this space
		* @property placements
		* @type object
		*/
		this.placements = {};
		
		/**
		* The current rendered ad
		* @property ad
		* @type object
		*/
		this.ad = {};
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();
	
	/**
	* Append the ad.element as a child and emit the ad event 'placement'
	*
	* @method placeAd
	* @param {Object} DomElement Ad to append in element
	* @return {Object} return this to chain methods
	*/
	SpaceDom.prototype.placeAd = function(ad){
		this.element.appendChild(ad.element);
		ad.emit('placement');
		this.ad = ad;
		return this;
	};
	
	/**
	* @method getElement
	* @return {Object} return the DomElement
	*/
	SpaceDom.prototype.getElement = function(){
		return this.document.getElementById(this.id);
	};
	
	exports.SpaceDom = SpaceDom;
})();
