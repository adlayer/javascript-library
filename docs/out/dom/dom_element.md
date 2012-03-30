# class DomElement

# link https://developer.mozilla.org/en/DOM/element


<p>Abstract class for dom/html elements </p>
```javascript
var DomElement = function(){
```
<ul>
<li>@property {String} id Id attribute of object</li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>@property {Object} element Dom element itself</li>
</ul>
```javascript
this.element = {};
};
```* param String tagName
* param Object document
# static 

# returns {Object} element


<p>@method create</p>
```javascript
DomElement.create = function(tagName, document){
	return document.createElement(tagName);
};
```* param String tagName
* param Object document
# public 

# returns {Object} this - Chainable method


<p>@method create</p>
```javascript
DomElement.prototype.create = function(tagName, document){
	//		file global || adlayer js module wrapper || passed document context
	document = this.document || global.document || document;
	this.element = DomElement.create(tagName, document);
	return this;
};
```* param Object child
# public 

# returns {Object} this - Chainable method


<p>@method append</p>
```javascript
DomElement.prototype.append = function(child){
	this.element.appendChild(child);
	return this;
};
```* param String tag
# public 

# returns {Object} parentElement


<p>@method findParentTag</p>
```javascript
DomElement.prototype.findParentTag = function(tag){
	var parent = this.element.parentNode;
	while(parent.nodeName != tag){
		parent = parent.parentNode;
	}
	return parent;
};
```* param String type
* param Function eventListener
# public 

# returns {Object} return this to allow chainability


<p>@method addEventListener</p>
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