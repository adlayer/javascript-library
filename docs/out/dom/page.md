# class Page

# constructor 

* param Object attributes

<p>Abstract class for page</p>
```javascript
var Page = function( attributes ){
```
<ul>
<li>@property {String} id unique page id</li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>@property {String} name page name</li>
</ul>
```javascript
this.name = '';
```
<ul>
<li>@property {Array} spaces Collection of page spaces</li>
</ul>
```javascript
this.spaces = [];
```
<ul>
<li>@property {Boolean} true for active and false for inactive</li>
</ul>
```javascript
this.status = true;
```
<ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>
```javascript
var __construct = (function(self){
		// initiate here
		for( var attribute in attributes ){
			if( attributes.hasOwnProperty(attribute) ){
				self[attribute] = attributes[attribute];
			}
		}
		return self;
	})(this);
};
```
<ul>
<li>@method getActiveContent
<ul><li>@public</li>
<li>@returns {Object} new Page() - return the instance itself to improve chainability</li>
<li>@requires Javascript 1.6</li>
<li><strong>Warning:</strong> Don't use this in browser, because it can not work in old browsers</li>
<li>@todo: should be readonly not modify the object just return filtered value</li></ul></li>
</ul>
```javascript
Page.prototype.getActiveContent = function(){
		if( this.spaces && this.spaces.length >= 1 ){
			// Run over and redesign every space (removing ads with status false)
			this.spaces = this.spaces.map(function(space){
				if( space.ads && space.ads.length >= 1 ){
					space.ads = space.ads.filter(function(ad){
						// If ad has status equal to false will auto removed from array
						return ad.status;
					});
				}
				// re-assign modified space to spaces collection
				return space;
			});
		}
		return this;
	};
```
<ul>
<li>@requires modules in browser
<ul><li>@exports Page as Page</li></ul></li>
</ul>
```javascript
exports.Page = Page;
```