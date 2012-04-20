var expect = expect || require('expect.js');
var document = document || require('../document');

var EmbedAd = require('../../src/ads/embed_ad').EmbedAd;
describe('EmbedAd', function(){
	describe('__construct', function(){
		it('Should defined an element and set de source', function(){
			var ad = new EmbedAd({
				id: '10',
				src: 'http://adlayer.com.br/img/logo.swf',
				document:document,
				link: 'http://adlayer.com.br'
			});
			expect(ad.element.nodeName).to.be.equal('EMBED');
			expect(ad.element.src).to.be.equal(ad.src);
			expect(ad.element.id).to.be.equal(ad.id);
			expect(ad.element.wmode).to.be.equal('transparent');
		});
	});
});