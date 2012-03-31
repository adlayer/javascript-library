# class Event

# constructor 

* param Object attributes

<p>Create any event</p>
```javascript
var Event = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
```
<ul>
<li>@property {Object} <strong>date</strong> Instance of current date
<ul><li>@private</li></ul></li>
</ul>
```javascript
var date = new Date();
```
<ul>
<li>@property {String} type Event type
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.type = '';
```
<ul>
<li>@property {String} campaign_id Campaign Id
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.campaign_id = '';
```
<ul>
<li>@property {String} ad_id Ad id
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.ad_id = '';
```
<ul>
<li>@property {String} space_id Space id
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.space_id = '';
```
<ul>
<li>@property {String} site_id Site id
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.site_id = '';
```
<ul>
<li>@property {String} page_url Url of the current page
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.page_url = '';
```
<ul>
<li>@property {String} date Date ISO 8601 format
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.date = '';
```
<ul>
<li>@property {String} time Time of event
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.time = '';
```
<ul>
<li>@property {String} hour
<ul><li>@description First part of a time iso</li>
<li>@public</li></ul></li>
</ul>
```javascript
this.hour = '';
```
<ul>
<li>@property {String} ip Visitor ip
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.ip = '';
```
<ul>
<li>@property {String} browser User agent or browser
<ul><li>@public</li></ul></li>
</ul>
```javascript
this.browser = '';
```
<ul>
<li>@method getFullDate
<ul><li>@privileged</li>
<li>@returns {String} Even if date is not converted to string return ISOString</li></ul></li>
</ul>
```javascript
this.getFullDate = function(){
		if( typeof date === 'object' ){
			return date = date.toISOString();
		}
		return date;
	};
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
<li>@property {Array} required List of all required attributes
<ul><li>@static</li></ul></li>
</ul>
```javascript
Event.required = [
		'type',
		'campaign_id',
		'space_id',
		'page_url',
		'page_id'
	];
```
<ul>
<li>@method track
<ul><li>@static</li>
<li>@returns {Object} return the result of method save</li></ul></li>
</ul>
```javascript
Event.track = function(attributes){
		return new Event(attributes).save();
	};
```
<ul>
<li>@method getDate
<ul><li>@public</li>
<li>@returns {String} The second part of a fulldate splited in T character</li></ul></li>
</ul>
```javascript
Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};
```
<ul>
<li>@method getTime
<ul><li>@public</li>
<li>@returns {String} he second part of a fulldate splited in T character</li></ul></li>
</ul>
```javascript
Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};
```
<ul>
<li>@method getHour
<ul><li>@public</li>
<li>@returns {String || Boolean} String of hour or false</li></ul></li>
</ul>
```javascript
Event.prototype.getHour = function(){
		if( this.time ){
			return this.time.split(':')[0];
		}
		return false;
	};
```
<ul>
<li>@method validate
<ul><li>@public</li>
<li>@returns {Boolean} true for all attributes and false if any is missing</li></ul></li>
</ul>
```javascript
Event.prototype.validate = function(){
		for( var i = 0; i < Event.required.length; i++ ){
			var attr = Event.required[i];
			if( !this[attr] ){
				return false;
			}	
		}
		// default
		return true;
	};
```
<ul>
<li>@method toQuery
<ul><li>@public</li>
<li>@returns {String} convert object to network string</li></ul></li>
</ul>
```javascript
Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
```
<ul>
<li>@method save
<ul><li>@public</li>
<li>@returns {Error} convert object to network string</li></ul></li>
</ul>
```javascript
Event.prototype.save = function(){
		throw new Error('You should override this');
	};
```
<ul>
<li>@requires modules in browser
<ul><li>@exports Event as Event</li></ul></li>
</ul>
```javascript
exports.Event = Event;
```