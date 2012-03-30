
<p>@class</p>
```javascript
var Site = function( attributes ){
```
<ul>
<li>Unique site id
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.id = '';
```
<ul>
<li>Site name
<ul><li>@type string</li></ul></li>
</ul>
```javascript
this.name = '';
```
<ul>
<li>Site status - true for active and  false for inactive
<ul><li>@type boolean</li></ul></li>
</ul>
```javascript
this.status = true;
```
<ul>
<li>Collection of all allowed domains
<ul><li>@type array</li></ul></li>
</ul>
```javascript
this.domains = [];
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
```# public 

* param String entry
# returns {Boolean} - True when found a domain and false for not

# todo: change to regex


<p>@description Find for exact domain or subdomain</p>
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
```# exports Event as Event


<p>@requires modules in browser</p>
```javascript
exports.Site = Site;
```