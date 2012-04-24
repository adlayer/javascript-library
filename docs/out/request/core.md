# class Core

# constructor 

# requires merge


<p>Core class</p>
```javascript
var Core = function(){
	var merge = require('../utils/merge').merge;
```
<ul>
<li>@method extend
<ul><li>@privileged</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>
```javascript
this.extend = function(attributes){
		return merge(this, attributes);
	};
};
exports.Core = Core;
```