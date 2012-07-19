var expect = expect || require('expect.js');
var document = document || require('../document');

var api = require('../../src/api/api').adlayer;
api = this.adlayer;
describe('Api', function(){
	
	describe('page', function(){
		it('Should be defined', function(){
			expect(api.page).to.be.ok();
		});
	});
	
	describe('space', function(){
		it('Should be defined', function(){
			expect(api.space).to.be.ok();
		});
	});
	
	describe('ad', function(){
		it('Should be defined', function(){
			expect(api.ad).to.be.ok();
		});
	});
	
});