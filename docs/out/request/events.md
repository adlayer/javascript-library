# classDescription Implementation minimized of node event emitter


<p>@class Event Emitter</p>
```javascript
var events = {};
var EventEmitter = function(){
```
<p>@private</p>
```javascript
var listeners = {
			load:[],
			click:[],
			readyStateChange:[]
	};
	
	this.listeners = function(event){
		return listeners[event];
	};
```
<p>@public</p>
```javascript
this.addListener = function(event,fn){
		if(!listeners[event]){
			listeners[event] = [];
		}
		listeners[event].push(fn);
		return listeners[event];
	};
	
	this.on = function(event, fn){
		return this.addListener(event,fn);
	};
```
<p>@public</p>
```javascript
this.emit = function(event){
		var eventListeners = listeners[event];
		if(eventListeners.length > 0){
			var i = 0;
			for(i; i < eventListeners.length; i++){
				eventListeners[i].call();
			}
			return eventListeners;
		}
	};
};
events.EventEmitter = EventEmitter;
exports.events = events;
```