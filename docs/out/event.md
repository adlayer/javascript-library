# class Event

# constructor 

* param Object attributes

<b><p>Create any event</p></b>
```javascript
var Event = function( attributes ){
```
<b><ul>
<li>@property {Object} date Instance of current date
<ul><li>@private</li></ul></li>
</ul></b>
```javascript
var date = new Date();
```
<b><ul>
<li>@property {String} type Event type
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.type = '';
```
<b><ul>
<li>@property {String} campaign_id Campaign Id
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.campaign_id = '';
```
<b><ul>
<li>@property {String} ad_id Ad id
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.ad_id = '';
```
<b><ul>
<li>@property {String} space_id Space id
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.space_id = '';
```
<b><ul>
<li>@property {String} site_id Site id
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.site_id = '';
```
<b><ul>
<li>@property {String} page_url Url of the current page
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.page_url = '';
```
<b><ul>
<li>@property {String} date Date ISO 8601 format
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.date = '';
```
<b><ul>
<li>@property {String} time Time of event
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.time = '';
```
<b><ul>
<li>@property {String} hour
<ul><li>@description First part of a time iso</li>
<li>@public</li></ul></li>
</ul></b>
```javascript
this.hour = '';
```
<b><ul>
<li>@property {String} ip Visitor ip
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.ip = '';
```
<b><ul>
<li>@property {String} browser User agent or browser
<ul><li>@public</li></ul></li>
</ul></b>
```javascript
this.browser = '';
```
<b><ul>
<li>@method getFullDate
<ul><li>@privileged</li>
<li>@returns {String} Even if date is not converted to string return ISOString</li></ul></li>
</ul></b>
```javascript
this.getFullDate = function(){
		if( typeof date === 'object' ){
			return date = date.toISOString();
		}
		return date;
	};
```
<b><ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul></b>
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
```
<b><ul>
<li>@property {Array} required List of all required attributes
<ul><li>@static</li></ul></li>
</ul></b>
```javascript
Event.required = [
		'type',
		'campaign_id',
		'space_id',
		'page_url',
		'page_id'
	];
```
<b><ul>
<li>@method track
<ul><li>@static</li>
<li>@returns {Object} return the result of method save</li></ul></li>
</ul></b>
```javascript
Event.track = function(attributes){
		return new Event(attributes).save();
	};
```
<b><ul>
<li>@method getDate
<ul><li>@public</li>
<li>@returns {String} The second part of a fulldate splited in T character</li></ul></li>
</ul></b>
```javascript
Event.prototype.getDate = function(){
		return this.getFullDate().split('T')[0];
	};
```
<b><ul>
<li>@method getTime
<ul><li>@public</li>
<li>@returns {String} he second part of a fulldate splited in T character</li></ul></li>
</ul></b>
```javascript
Event.prototype.getTime = function(){
		return this.getFullDate().split('T')[1];
	};
```
<b><ul>
<li>@method getHour
<ul><li>@public</li>
<li>@returns {String || Boolean} String of hour or false</li></ul></li>
</ul></b>
```javascript
Event.prototype.getHour = function(){
		if( this.time ){
			return this.time.split(':')[0];
		}
		return false;
	};
```
<b><ul>
<li>@method validate
<ul><li>@public</li>
<li>@returns {Boolean} true for all attributes and false if any is missing</li></ul></li>
</ul></b>
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
<b><ul>
<li>@method toQuery
<ul><li>@public</li>
<li>@returns {String} convert object to network string</li></ul></li>
</ul></b>
```javascript
Event.prototype.toQuery = function(){
		var querystring = require('../node_modules/querystring').querystring;
		return querystring.stringify(this);
	};
```
<b><ul>
<li>@method save
<ul><li>@public</li>
<li>@returns {Error} convert object to network string</li></ul></li>
</ul></b>
```javascript
Event.prototype.save = function(){
		throw new Error('You should override this');
	};
```
<b><ul>
<li>@requires modules in browser
<ul><li>@exports Event as Event</li></ul></li>
</ul></b>
```javascript
exports.Event = Event;
```