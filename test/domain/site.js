var expect = expect || require('expect.js');

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
		it('should return true when have domain in list', function(){
			expect(site.hasDomain('adlayerjavascriptsdk.com')).to.be(true);
		});
		it('should identify a wildcard subdomain', function(){
			site.domains.push('*adlayerjavascriptsdk.com');
			expect(site.hasDomain('dev.adlayerjavascriptsdk.com')).to.be(true);
		});
		it('should return false for a non listed domain', function(){
			expect(site.hasDomain('adlayerapp.com')).to.be(false);
		});
	});
});