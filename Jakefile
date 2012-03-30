//var Biscuit = require('biscuit');
var manifest  = require('./manifest');
var smoosh = require('smoosh');
var fs = require('fs');
var Hogan = require('hogan.js');
var exec = require('child_process').exec;
var path = require('path');

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
	var docs = 'docs';
	var jsons = docs + '/' + 'json';
	var out = docs + '/' + 'out';
	
	var template = fs.readFileSync('docs/comment.md').toString(),
		template = Hogan.compile(template);
	
	// Discovering module names
	for( var module in modules ){
		// Run over module files
		modules[module].forEach(function(file){
			
			var basename = path.basename(file, '.js');
			var raw = jsons + '/' + module + '/' + basename + '.json';
			
			var command = 'dox < {file} > {json}',
				command = command.replace('{file}', file),
				command = command.replace('{json}', raw);
				
			// Write raw data to docs/json
			exec(command, function(error, stdout, stderr){
				if (error !== null) {
					console.log('exec error: ' + error);
				} else {
					var json = require('./'+raw);
					var render = [];
					
					json.forEach(function(comment){
						var output = template.render(comment);
						render.push(output);
					});
					
					fs.writeFileSync(out + '/' + module + '/' + basename + '.md' , render.join(''));
				}
			});

		});
	}
	/**
	var json = require('./docs/json/domain/event.json');
	
	var template = fs.readFileSync('docs/comment.md').toString();
	template = Hogan.compile(template);

	var render = [];
	json.forEach(function(comment){
		var output = template.render(comment);
		render.push(output);
	});
	fs.writeFileSync('docs/out/event.md', render.join(''));
	**/
});