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
```
<ul>
<li>@method create
<ul><li>@param {String} tagName</li>
<li>@param {Object} document</li>
<li>@static</li>
<li>@returns {Object} element</li></ul></li>
</ul>
```javascript
DomElement.create = function(tagName, document){
		return document.createElement(tagName);
	};
```
<ul>
<li>@method create
<ul><li>@param {String} tagName</li>
<li>@param {Object} document</li>
<li>@public</li>
<li>@returns {Object} this - Chainable method</li></ul></li>
</ul>
```javascript
DomElement.prototype.create = function(tagName, document){
		//		file global || adlayer js module wrapper || passed document context
		document = this.document || global.document || document;
		this.element = DomElement.create(tagName, document);
		return this;
	};
```
<ul>
<li>@method append
<ul><li>@param {Object} child</li>
<li>@public</li>
<li>@returns {Object} this - Chainable method</li></ul></li>
</ul>
```javascript
DomElement.prototype.append = function(child){
		this.element.appendChild(child);
		return this;
	};
```
<ul>
<li>@method findParentTag
<ul><li>@param {String} tag UPPERCASE tag name</li>
<li>@public</li>
<li>@returns {Object} parentElement</li></ul></li>
</ul>
```javascript
DomElement.prototype.findParentTag = function(tag){
		var parent = this.element.parentNode;
		while(parent.nodeName != tag){
			parent = parent.parentNode;
		}
		return parent;
	};
```
<ul>
<li>@method addDomEventListener
<ul><li>@param {String} type Event name like 'click', 'load', 'mouseover'</li>
<li>@param {Function} eventListener Callback for event trigger</li>
<li>@public</li>
<li>@returns {Object} return this to allow chainability</li></ul></li>
</ul>
```javascript
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
```