# link https://developer.mozilla.org/en/DOM/element


<p>@class</p>
```javascript
var DomElement = function(){
```
<ul>
<li>Element id
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>Dom element itself
<ul><li>@type object</li></ul></li>
</ul>
```javascript
this.element = {};
};
```
<p>@static</p>
```javascript
DomElement.create = function(tagName, document){
	return document.createElement(tagName);
};
```# returns {Object} this


<p>@public</p>
```javascript
DomElement.prototype.create = function(tagName, document){
	//		file global || adlayer js module wrapper || passed document context
	document = this.document || global.document || document;
	this.element = DomElement.create(tagName, document);
	return this;
};
```# returns {Object} this


<p>@public</p>
```javascript
DomElement.prototype.append = function(child){
	this.element.appendChild(child);
	return this;
};
```# params {String} UPPERCASE tag name

# returns {Object} NativeDom


<p>@public</p>
```javascript
DomElement.prototype.findParentTag = function(tag){
	var parent = this.element.parentNode;
	while(parent.nodeName != tag){
		parent = parent.parentNode;
	}
	return parent;
}
```# returns {Object} return this to allow chainability


<p>@public</p>
```javascript
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
```