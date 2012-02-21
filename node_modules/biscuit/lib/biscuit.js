var fs = require('fs');
var hogan = require('hogan.js');
var uglify = require('uglify-js');
var colors = require('colors');
var jsHint = require("jshint");
var validate = jsHint.JSHINT;

var Biscuit = function(manifest){
	this.manifest = manifest;
	
	this.name = manifest.name;
	
	// Where files will be saved
	this.destDir = 'lib';
	
	// Jshint options
	this.options = {
		white:false
	};
	
	// Predefined templates
	this.templates = {
		jshint: hogan.compile( fs.readFileSync(__dirname + '/../templates/jshint.mustache').toString() ),
		module: hogan.compile( fs.readFileSync(__dirname + '/../templates/module.mustache').toString() )
	};
	
	
	// Shortcuts
	this._files = this.manifest.files;
	this._t = this.templates;
	
	
	// Constructor
	var __construct = (function(self){
		self.validate(self._files);
		
		var full = self.compile(self._files);
		fs.writeFile( self.destDir + '/' + self.name + '.js', full, function(err){
			if(err) console.log(err);
		});
		
		var zip = self.compress(full);
		fs.writeFile( self.destDir + '/' + self.name + '.min.js', zip, function(err){
			if(err) console.log(err);
		});
		
	})(this);
	
};


/**
* @param {Array} files
*/
Biscuit.prototype.validate = function(files){
	var self = this;
	
	files.forEach(function(file){
		// Read file contents
		var content = fs.readFileSync(file, 'utf8').toString();
		
		// Try validate content
		if( !validate( content, this.options ) ){
			var context = {
				file: file,
				errors: validate.errors
			}
			var result = self._t.jshint.render(context);
			// Output errors in screens
			return result;
		}
	});
}


/**
* @param {Array} files
*/
Biscuit.prototype.compile = function(files){
	var buffer = [];
	
	files.forEach(function(file){
		// Read file contents
		var content = fs.readFileSync(file, 'utf8').toString();
		buffer.push(content);
	});
	
	var context = {
		version:'0.1.1',
		content: buffer.join('\n')
	}
	var result = this._t.module.render(context);
	return result;
}


/**
* @param {String} content
*/
Biscuit.prototype.compress = function(content){
	var parsedCode = uglify.parser.parse(content, false);
	var minimized = uglify.uglify.gen_code(parsedCode);
	return minimized;
}

module.exports = Biscuit;