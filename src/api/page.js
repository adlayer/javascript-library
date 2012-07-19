(function(){
	var EventEmitter = require('../node_modules/events').events.EventEmitter;
	var Page = require('../domain/page').Page;
	
	var PageApi = function(){
		Page.apply(this, arguments);
		EventEmitter.apply(this, arguments);	
	}
	exports.PageApi = Page;
})();