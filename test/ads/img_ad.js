var expect = expect || require('expect.js');
var document = document || require('../document');

var ImgAd = require('../../src/ads/img_ad').ImgAd;
describe('ImgAd', function(){
	describe('__construct', function(){
		it('Should defined an element and set de source', function(){
			var ad = new ImgAd({
				src: 'http://adlayer.com.br/img/logo.png',
				document:document
			});
			expect(ad.element.nodeName).to.be.equal('IMG');
			expect(ad.element.src).to.be.equal(ad.src);
		});
		it('Should wrap the ad in an anchor when link are difined', function(){
			var ad = new ImgAd({
				link: 'http://adlayer.com.br',
				src: 'http://adlayer.com.br/img/logo.png',
				document:document
			});
			expect(ad.element.nodeName).to.be.equal('A');
			expect(ad.element.href).to.contain(ad.link);
			expect(ad.element.firstChild.nodeName).to.be.equal('IMG');
		});
	});
});