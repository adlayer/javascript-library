# class Core

# constructor 


<p>Core class</p>
```javascript
var Core = function(){
```
<ul>
<li>@method extend
<ul><li>@privileged</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>
```javascript
this.extend = function(attributes){
		// initiate here
		for( var attribute in attributes ){
			if( attributes.hasOwnProperty(attribute) ){
				this[attribute] = attributes[attribute];
			}
		}
		return this;
	};
};
exports.Core = Core;
```