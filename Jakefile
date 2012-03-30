//var Biscuit = require('biscuit');
var manifest  = require('./manifest');
var smoosh = require('smoosh');
var fs = require('fs');

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

desc('run default tasks');
task('default', function(){
	//new Biscuit(manifest);
	smoosh.make(config);
});


desc('docs');
task('docs', function(){
	var Hogan = require('hogan.js');
	var json = require('./docs/json/domain/event.json');
	
	var template = fs.readFileSync('docs/comment.md').toString();
	template = Hogan.compile(template);

	var render = [];
	json.forEach(function(comment){
		var output = template.render(comment);
		render.push(output);
	});
	fs.writeFileSync('docs/out/event.md', render.join(''));
/**	
	var output = template.render(file);
	console.log(output);
**/
});