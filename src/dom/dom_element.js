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
	* @return {Object} element
	*/
	DomElement.create = function(tagName, document){
		return document.createElement(tagName);
	};
	/**
	* @method create
	* @param {String} tagName
	* @param {Object} document
	* @public
	* @return {Object} this - Chainable method
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
	* @return {Object} this - Chainable method
	*/
	DomElement.prototype.setAttributes = function(attributes){
		var merge = require('../utils/merge').merge;
		merge(this.element, attributes);
	};
	
	/**
	* @method append
	* @param {Object} child
	* @public
	* @return {Object} this - Chainable method
	*/
	DomElement.prototype.append = function(child){
		this.element.appendChild(child);
		return this;
	};
	/**
	* @method findParentTag
	* @param {String} tag UPPERCASE tag name
	* @public
	* @return {Object} parentElement
	*/
	DomElement.prototype.findParentTag = function(tag){
		var parent = this.element.parentNode;
		if(parent){
			while(parent.nodeName != tag){
				parent = parent.parentNode;
			}
			return parent;
		}
		return false;
	};
	/**
	* @method addDomEventListener
	* @param {String} type Event name like 'click', 'load', 'mouseover'
	* @param {Function} eventListener Callback for event trigger
	* @public
	* @return {Object} return this to allow chainability
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