var smoosh = require('smoosh');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

var modules = {};

utils = [
	"./src/module.js",
	"./src/utils/copy.js",
	"./src/utils/merge.js",
	"./src/utils/loadscript.js",
	"./src/node_modules/events.js",
	"./src/node_modules/querystring.js"
];

config = [
	"./src/config/config.js"
];

domain = [
	"./src/domain/core.js",
	"./src/domain/event.js", 
	"./src/domain/ad.js",
	"./src/domain/space.js",
	"./src/domain/page.js",
	"./src/domain/site.js"
];

dom = [
	"./src/dom/dom_element.js", 
	"./src/dom/ad_dom.js",
	"./src/dom/space_dom.js"
];

request = [
	"./src/request/http.js", 
	"./src/request/http_request.js",
	"./src/request/img_request.js",
	"./src/request/jsonp_request.js",
	"./src/request/request.js"
];

connection = [
	"./src/connection/connection.js"
];

ads = [
	"./src/ads/swf.js",
	"./src/ads/embed_ad.js",
	"./src/ads/object_ad.js",
	"./src/ads/img_ad.js",
	"./src/ads/flash_ad.js",
	"./src/ads/ads.js"
];

spaces = [
	"./src/spaces/expandable_space.js",
	"./src/spaces/floater_space.js",
	"./src/spaces/static_space.js",
	"./src/spaces/spaces.js"
];

var tracker = ["./src/tracker/tracker.js"];

api = [
	"./src/api/page.js",
	"./src/api/api.js"
];

modules.api = [].concat(utils, config, domain, dom, request, connection, tracker, ads, spaces, api);

var config = {
	"VERSION": "1.0.0",
	"JSHINT_OPTS": { 
		"boss": true,
		"forin": true,
		"browser": true
	},
	"JAVASCRIPT": modules
}

desc('run default tasks');
task('default', function(){
	smoosh.make(config);
});