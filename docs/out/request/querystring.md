# public 


<p>QueryString module for handle params</p>
```javascript
var queryString = {
```
<p>@public</p>
```javascript
parse:function(qs){
		var sep = "&";
		var eq = "=";
		var obj = {};

		qs = qs.split(sep);
		for(var i = 0; i < qs.length; i++){
			var prop = qs[i];
			prop = prop.split(eq);
			var key = prop[0];
			var value = prop[1];
			
			//is number
			if(!isNaN(value)){
				value = parseInt(value,10);
			}
			
			obj[key] = value;
		}
		return obj;
	},
```
<p>@public</p>
```javascript
stringify:function(obj){
		var sep = "&";
		var eq = "=";
		var list =  [];
		
		for( var param in obj ){
			if( obj[param] && typeof obj[param] !== 'function'){
				list.push(param + eq + obj[param]);
			}
		}
		return list.join(sep);
	}
};
exports.querystring = queryString;
```