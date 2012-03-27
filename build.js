var smoosh = require('smoosh');

Array.prototype.extends = function(base){
	return base.concat(this);
}

var modules = {};
modules.domain = [
	"./src/domain/event.js", 
	"./src/domain/ad.js",
	"./src/domain/space.js",
	"./src/domain/page.js",
	"./src/domain/site.js"
];

modules.dom = [
	"./src/dom/dom_element.js", 
	"./src/dom/ad_dom.js",
	"./src/dom/space_dom.js"
].extends(modules.domain);


var config = {
	"VERSION": "1.0.0",
	"JSHINT_OPTS": { 
		"boss": true,
		"forin": true,
		"browser": true
	},
	"JAVASCRIPT": modules
}
smoosh.make(config);
