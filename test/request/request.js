var expect = expect || require('expect.js');
if(typeof this.document === 'undefined'){
	var document = require('../document');
}

var request = require('../../src/request/request').request;

describe('request', function(){
	describe('#jsonp', function(){
		it('Have a jsonp method', function(){
			expect(request().jsonp).to.be.a('function');
		});
	});
	describe('#get', function(){
		it('Have a get method as a jsonp alias', function(){
			expect(request().get).to.be.a('function');
		});
	});
	describe('#img', function(){
		it('Should have a img method', function(){
			expect(request().img).to.be.a('function');
		});
	});
});