# class Space

# constructor 

* param Object attributes

<p>Abstract class for spaces</p>
```javascript
var Space = function( attributes ){
```
<ul>
<li>@property {String} id Unique space id</li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>@property {String} type Type of space</li>
</ul>
```javascript
this.type = '';
```
<ul>
<li>@property {Boolean} status true for active and false for inactive</li>
</ul>
```javascript
this.status = '';
```
<ul>
<li>@property {Array} ads Collection of ads linked to space</li>
</ul>
```javascript
this.ads = [];
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
<li>@method getRandomAd
<ul><li>@return {Object} Ad</li></ul></li>
</ul>
```javascript
Space.prototype.getRandomAd = function(){
		var total = this.ads.length;
		var index = Math.floor(Math.random() * total);
		return this.ads[index];
	};
```
<ul>
<li>@requires modules in browser
<ul><li>@exports Space as Space</li></ul></li>
</ul>
```javascript
exports.Space = Space;
```