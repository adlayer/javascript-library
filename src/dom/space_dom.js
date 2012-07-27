(function(){
	
	// modules
	var DomElement = require('./dom_element').DomElement;
	var Space = require('../domain/space').Space;
	
	
	/*
	* Space dom
	*
	* @class SpaceDom
	* @requires DomElement
	* @requires Ad
	*/
	var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
		
		this.placements = {};
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();

	/*
	* @public
	* @param {Object} DomElement, Ad to append in element
	* @returns {Object} return this to chain methods
	*/
	SpaceDom.prototype.placeAd = function(ad){
		this.element.appendChild(ad.element);
		ad.emit('placement');
		return this;
	};
	
	/*
	* @public
	* @returns {Object} return the DomElement
	*/
	SpaceDom.prototype.getElement = function(){
		return this.document.getElementById(this.id);
	};
	
	exports.SpaceDom = SpaceDom;
})();
