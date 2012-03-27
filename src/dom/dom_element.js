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
DomElement.create = function(tagName, document){
	return document.createElement(tagName);
};
/*
* @public
* @returns {Object} this
*/
DomElement.prototype.create = function(tagName, document){
	//		file global || adlayer js module wrapper || passed document context
	document = this.document || global.document || document;
	this.element = DomElement.create(tagName, document);
	return this;
};
/*
* @public
* @returns {Object} this
*/
DomElement.prototype.append = function(child){
	this.element.appendChild(child);
	return this;
};

DomElement.prototype.findParentTag = function(tag){
	var parent = this.element.parentNode;
	while(parent.name != tag){
		parent = parent.parentNode;
	}
	return parent;
}
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