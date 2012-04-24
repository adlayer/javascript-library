# class HttpRequest

# constructor 

* param Object attributes
* param Function callback

<p>Abstract class to make http requests</p>
```javascript
var HttpRequest = function( attributes, callback ){
	var Http = require('./http').Http;
	Http.apply(this, arguments);
	
	this.callback = undefined;
```
<ul>
<li>@method wrap
<ul><li>@private</li>
<li>@param {Function} fn</li>
<li>@returns {Function} wrapper</li></ul></li>
</ul>
```javascript
function wrap(fn){
		function wrapper(data){
			if( data ) {
				fn(null, data);
			} else {
				fn(new Error('No Response'), null);
			}
		}
		return wrapper;
	}
```
<ul>
<li>@method expose
<ul><li>@privileged</li>
<li>@param {Object} obj</li>
<li>@returns {Function} wrapper</li></ul></li>
</ul>
```javascript
this.expose = function(obj){
		var fn = this.callback;
		obj.callback = wrap(fn);
	};
```
<ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>
```javascript
var __construct = function(self){
		if( typeof attributes === 'string' ){
			self.url = attributes;
		} else {
			self = self.extend(attributes);
		}
		// set callback
		self.callback = callback || self.callback;
	}(this);
};
exports.HttpRequest = HttpRequest;
```