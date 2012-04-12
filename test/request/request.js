var expect = expect || require('expect.js');
if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow(),
		document = window.document;
}

var request = require('../../src/request/request').request;

describe('request', function(){
	describe('#jsonp', function(){
		it('Have a jsonp method', function(){
			expect(request().jsonp).to.be.ok();
		});
	});
	describe('#img', function(){
		it('Should have a img method', function(){
			expect(request().img).to.be.ok();
		});
	});
});