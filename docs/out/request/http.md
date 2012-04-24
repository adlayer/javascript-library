# class Http

# constructor 


<p>Abstract class to http requests, connections and responses</p>
```javascript
var Http = function(){
	var Core = require('../domain/core').Core;
	var queryString = require('../node_modules/querystring').querystring;
	Core.apply(this, arguments);
	
	this.host = '';
	this.protocol = 'http';
	this.port = 80;
	this.path = '/';
	this.qs = {};
	this.query = '';
	this.url = '';

	function isEmptyObject(obj){
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) return false;
		}
		return true;
	}
```
<ul>
<li>@method getUrl
<ul><li>@privileged</li>
<li>@returns {String} full url</li></ul></li>
</ul>
```javascript
this.getUrl = function(){
		if( !this.url ){
			this.url = this.protocol;
			this.url += '://';
			this.url += this.host;
			this.url += this.path;
			
			if (!isEmptyObject(this.qs)){
				this.query = [this.query, queryString.stringify(this.qs)].join('&');
			}
			if (this.query){
				this.url += '?' + this.query;	
			}
			
		}
		return this.url;
	};
};
exports.Http = Http;
```