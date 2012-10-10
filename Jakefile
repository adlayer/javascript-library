var smoosh = require('smoosh');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

var modules = {};

var head = ["./template/head.js"];

var utils = [
	"./src/module.js",
	"./src/utils/copy.js",
	"./src/utils/merge.js",
	"./src/utils/loadscript.js",
	"./src/node_modules/events.js",
	"./src/node_modules/querystring.js"
];

var domain = [
	"./src/domain/core.js",
	"./src/domain/event.js", 
	"./src/domain/ad.js",
	"./src/domain/space.js",
	"./src/domain/page.js",
	"./src/domain/site.js"
];

var request = [
	"./src/request/http.js", 
	"./src/request/http_request.js",
	"./src/request/img_request.js",
	"./src/request/jsonp_request.js",
	"./src/request/request.js"
];

var connection = [
	"./src/connection/connection.js"
];

var tracker = ["./src/tracker/tracker.js"];

var dom = [
	"./src/dom/dom_element.js", 
	"./src/dom/ad_dom.js",
	"./src/dom/space_dom.js"
];

var ads = [
	"./src/ads/swf.js",
	"./src/ads/embed_ad.js",
	"./src/ads/object_ad.js",
	"./src/ads/img_ad.js",
	"./src/ads/flash_ad.js",
	"./src/ads/ads.js"
];

var spaces = [
	"./src/spaces/basic_space.js",
	"./src/spaces/expandable_space.js",
	"./src/spaces/floater_space.js",
	"./src/spaces/static_space.js",
	"./src/spaces/spaces.js"
];


var config = [
	"./src/config/config.js"
];

var api = [
	"./src/api/page.js",
	"./src/api/api.js"
];

var footer = ["./template/footer.js"];

modules.api = [].concat(head, utils, domain, request, connection, tracker, dom, ads, spaces, config, api, footer);

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