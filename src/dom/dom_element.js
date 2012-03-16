/*
* @class
* @link https://developer.mozilla.org/en/DOM/element
*/
var DomElement = function(){
	/*
	* Element id
	* @type string
	*/
	this.id = '';
	/*
	* Dom element itself
	* @type object
	*/
	this.element = {};
};

/*
* @static
*/
DomElement.document = document;
/*
* @static
*/
DomElement.create = function(tagName, document){
	return document.createElement(tagName);
};
/*
* @public
* @returns {Object} return the created element
*/
DomElement.prototype.create = function(tagName, document){
	document = DomElement.document || document;
	this.element = DomElement.create(tagName, document);
	return this.element;
};
/*
* @public
* @returns {Object} return this to allow chainability
*/
DomElement.prototype.addEventListener = function(type, eventListener){
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