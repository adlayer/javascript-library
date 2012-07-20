var expect = expect || require('expect.js');

var Core = require('../../src/domain/core').Core;

describe('Core', function(){
	describe('#extend', function(){
		var site = new Core();
		site.extend({
			id: 1
		});
		it('Should fill all attributes', function(){
			expect(site.id).to.be.ok();	
		});
	});
	describe('#toQuery', function(){
		var ad = new Core();
		ad.page = 10;
		ad.site = 11;
		
		it('Should convert object to query', function(){
			expect(ad.toQuery()).to.be.equal('page=10&site=11');	
		});
	});
});