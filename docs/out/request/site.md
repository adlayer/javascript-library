# class Site

# constructor 

* param Object attributes

<p>Abstract class for site</p>
```javascript
var Site = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
```
<ul>
<li>@property {String} id Unique site id</li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>@property {String} name Name of site</li>
</ul>
```javascript
this.name = '';
```
<ul>
<li>@property {Boolean} status true for active and  false for inactive</li>
</ul>
```javascript
this.status = true;
```
<ul>
<li>@property {Array} domains Collection of all allowed domains</li>
</ul>
```javascript
this.domains = [];
```
<ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>
```javascript
var __construct = function(self){
		self = self.extend(attributes);
	}(this);
};
```
<ul>
<li>@description Find for exact domain or subdomain
<ul><li>@public</li>
<li>@param {String} entry - Domain string</li>
<li>@returns {Boolean} - True when found a domain and false for not</li>
<li>@todo: change to regex</li></ul></li>
</ul>
```javascript
Site.prototype.hasDomain = function(entry){
		var self = this;
		var result = false;

		function found(content, context){
			return context.indexOf(content) !== -1;
		}
	
		// Found exact domain ?
		if( found(entry, this.domains ) ){
			result = true;
		} else {
			// Run in all domains
			this.domains.forEach(function(domain){
				// Current domain is a wildcard ?
				var wildcard = found('*', domain);
				if( wildcard ){
					// Remove star
					domain = domain.replace('*', '');
					if( found(domain, entry) ) result = true;
				}
			});
		}
		return result;
	};
```
<ul>
<li>@requires modules in browser
<ul><li>@exports Event as Event</li></ul></li>
</ul>
```javascript
exports.Site = Site;
```