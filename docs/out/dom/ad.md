
<p>@class</p>
```javascript
var Ad = function( attributes ){
```
<ul>
<li>Ad id
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>Name of ad creative
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.name = '';
```
<ul>
<li>Id to campaign that belongs to
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.campaign_id = '';
```
<ul>
<li>Ad type
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.type = '';
```
<ul>
<li>Path to  ad file
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.file = '';
```
<ul>
<li>Destiny link
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.link = '';
```
<ul>
<li>Ad status
<ul><li>@type boolean</li></ul></li>
</ul>
```javascript
this.status = true;
```
<ul>
<li>Alternative Ad is another instance of Ad with graceful degradation
<ul><li>@type object</li></ul></li>
</ul>
```javascript
this.alternative = {};
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
```# exports Ad as Ad


<p>@requires modules in browser</p>
```javascript
exports.Ad = Ad;
```