
<ul>
<li>@class
<ul><li>@requires DomElement</li>
<li>@requires Ad</li>
<li>@requires Event</li></ul></li>
</ul>
```javascript
var AdDom = function(){
		// extends Ad
		Ad.apply(this, arguments);	
	};
	// extends DomElement
	AdDom.prototype = new DomElement();
```
<ul>
<li>@public
<ul><li>@returns {String} return the id of the first parent div</li></ul></li>
</ul>
```javascript
AdDom.prototype.getSpaceId = function(){
		var node = this.findParentTag('DIV');
		return node.id;
	};
```
<ul>
<li>@public
<ul><li>@param {String} tracker url</li>
<li>@param {String} site_id</li>
<li>@param {String} page_id</li>
<li>@param {String} page_url</li>
<li>@returns {String} the full url to track this link</li>
<li>@example <a href='http://tracker.adlayerapp.com/click/10?&amp;campaign_id=1235&amp;link=http://www.adlayer.com.br'>http://tracker.adlayerapp.com/click/10?&amp;campaign_id=1235&amp;link=http://www.adlayer.com.br</a></li></ul></li>
</ul>
```javascript
AdDom.prototype.getClickTag = function(tracker, site_id, page_id, page_url ){

		var event = new Event({
			type: 'click',
			campaign_id: this.campaign_id,
			space_id: this.getSpaceId(),
			site_id: site_id,
			page_id: page_id,
			page_url: page_url,
			link: this.link
		});
		
		if( event.validate() && this.link ){
			var url = [tracker, 'click', this.id].join('/');
			url = url + '?' + event.toQuery();
			return url;
		}
		return false;
	};
	exports.AdDom = AdDom;
	
})();
```