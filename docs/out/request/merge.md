
<p>Util method for extend/merge objects</p>
```javascript
var merge = function(destination,source) {
    for (var property in source){
		if(source.hasOwnProperty(property)){
			destination[property] = source[property];
		}
	}
    return destination;
};
exports.merge = merge;
```