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
});