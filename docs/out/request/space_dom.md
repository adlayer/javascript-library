
<ul>
<li>Space dom
*
<ul><li>@class SpaceDom</li>
<li>@requires DomElement</li>
<li>@requires Ad</li></ul></li>
</ul>
```javascript
var SpaceDom = function(){
		// extends Space
		Space.apply(this, arguments);
	};
	// extends DomElement
	SpaceDom.prototype = new DomElement();
```
<ul>
<li>@public
<ul><li>@param {Object} DomElement to append in element</li>
<li>@returns {Object} return this to chain methods</li></ul></li>
</ul>
```javascript
SpaceDom.prototype.placeAd = function(ad){
		this.element.appendChild(ad.element);
		return this;
	};
	
	exports.SpaceDom = SpaceDom;
})();
```