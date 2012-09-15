var expect = expect || require('expect.js');
var document = document || require('../document');

var api = require('../../src/api/api').adlayer;
api = this.adlayer || api;
describe('Api', function(){
	
	describe('page', function(){
		it('Should be defined', function(){
			expect(api.page).to.be.ok();
		});
	});
	
	describe('spaces', function(){
		it('Should be defined', function(){
			expect(api.spaces).to.be.ok();
		});
	});
	
	describe('ads', function(){
		it('Should be defined', function(){
			expect(api.ads).to.be.ok();
		});
	});
	
});