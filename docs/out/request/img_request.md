# class ImgRequest

# constructor 

* param Object Attributes
* param Function callback
# example new ImgRequest({document:document, url}, callback)


<p>Loads an img</p>
```javascript
var ImgRequest = function(){
	var HttpRequest = require('./http_request').HttpRequest;
	HttpRequest.apply(this, arguments);
};
```
<ul>
<li>@method send
<ul><li>@public</li>
<li>@param {Object} data</li>
<li>@returns {Object} this to chain</li></ul></li>
</ul>
```javascript
ImgRequest.prototype.send = function(data){
		//todo: use merge to data-> query
		if(data) this.qs = data;
		
		// http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
		var document = this.document || document;
		var img = document.createElement('img');
		img.src = this.getUrl();
		if( this.callback ){
			img.onload = this.callback.apply({ok:true});
		}
		return this;
	};
```
<ul>
<li>@method make
<ul><li>@static</li>
<li>@param {Object} options   </li>
<li>@param {Function} callback</li>
<li>@returns {DOMObject} document</li></ul></li>
</ul>
```javascript
ImgRequest.make = function(options, callback, document){
		var instance = new ImgRequest(options, callback);
		if(document){
			instance.document = document;
		}
		instance.send();
		return instance;
	};
	
	exports.ImgRequest = ImgRequest;
```