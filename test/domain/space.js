var expect = expect || require('expect.js');
var Ad = require('../../src/domain/ad.js').Ad;
var Space = require('../../src/domain/space.js').Space;

describe('Space', function(){
	describe('#getRandomAd', function(){
		it('Should return a random ad', function(){
			
			var space = new Space({
				ads: [
					new Ad({id:1}),
					new Ad({id:2})
				]
			});
			expect(space.getRandomAd()).to.be.a(Ad);
		});
	});
});