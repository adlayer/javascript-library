var expect = expect || require('expect.js');
var Ad = require('../../src/domain/ad.js').Ad;
var Space = require('../../src/domain/space.js').Space;
var ISpaceBehaviour = require('../../src/domain/space.js').ISpaceBehaviour;

describe('ISpaceBehaviour', function(){
	describe('#getAd', function(){
		it('Should throw an error', function(){
			
			var behaviour = new ISpaceBehaviour();
			expect(behaviour.getAd).to.throwError('Implement it');

		});
	});
});

describe('Space', function(){
	describe('#setBehaviour', function(){
		it('Should set a behaviour in the created space', function(){
			
			var FirstBehaviour = function(){
				ISpaceBehaviour.apply(this, arguments);
				
				this.getAd = function(context){
					if(context){
						return context.ads[0];
					}
				}
			};
			
			var space = new Space({
				ads: [
					new Ad({id:1}),
					new Ad({id:2})
				]
			});
			var firstBehaviour = new FirstBehaviour();
			
			expect(firstBehaviour.getAd).to.not.throwError();
			
			space.setBehaviour(firstBehaviour);
			
			expect( space.getAd() ).to.be.equal(space.ads[0]);
		});
	});
	describe('#getAd', function(){
		it('Should return a random ad', function(){
			
			var space = new Space({
				ads: [
					new Ad({id:1}),
					new Ad({id:2})
				]
			});
			expect(space.getAd()).to.be.a(Ad);
		});
	});
});