# class Space

# todo: 

# 	static create

# 		eg Space.create(&#39;teste&#39;, {});

# 		// {}

# 	public getAd

# 		eg new Space().getAd(&#39;1234&#39;);

# 		// [{},{},{}]

# 	public save

# 		eg new Event().save(function(){});

# 		// null

# 	public place

# 		eg new Event().place(new Ad());

# 		// {}


<p>Abstract class for spaces</p>
```javascript
var Space = function( attributes ){
```
<ul>
<li>Unique page id
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>Space type
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.type = '';
```
<ul>
<li>Space status - true for active and false for inactive
<ul><li>@type boolean</li></ul></li>
</ul>
```javascript
this.status = '';
```
<ul>
<li>Collection of ads linked to space
<ul><li>@type array</li></ul></li>
</ul>
```javascript
this.ads = [];
```
<ul>
<li>@private
<ul><li>@returns {Object} return this to allow chain pattern</li></ul></li>
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
<li>@return {Object} Ad</li>
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