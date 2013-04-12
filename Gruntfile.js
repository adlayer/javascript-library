
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				logo: 'http://adlayer.com.br/img/logo.png',
				options: {
					paths: ['src'],
					outdir: 'docs'
				}
			}
		},
		mochaTest: {
			files: ['test/ads/*.js', 'test/connection/*.js', 'test/dom/*.js', 'test/domain/*.js', 'test/request/*.js', 'test/spaces/*.js']
		},
		mochaTestConfig: {
			options: {
				reporter: 'spec'        
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.registerTask('default', ['jshint', 'mochaTest']);
	grunt.registerTask('docs', ['yuidoc']);
};