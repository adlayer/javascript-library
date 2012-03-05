var Site = require('../../src/domain/site').Site;
describe('Site', function(){
	describe('#hasDomain', function(){
		var site = new Site({
			id: '1',
			domains: [
				'adlayer.com.br',
				'adlayerjavascriptsdk.com'
			]
		});
		it('should return false for a non listed domain', function(){
			expect(site.hasDomain('adlayerapp.com')).to.be(false);
		});
		it('should return true when have domain in list', function(){
			expect(site.hasDomain('adlayerjavascriptsdk.com')).to.be(true);
		});
	});
});