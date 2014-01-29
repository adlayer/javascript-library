var expect = expect || require('expect.js');
var document = document || require('../document');

var HtmlAd = require('../../src/ads/html_ad').HtmlAd;
describe('HtmlAd', function(){
	describe('__construct', function(){
		it('Should define the element and set de source', function(){
			var ad = new HtmlAd({
				src: 'http://dev.ads.adlayerapp.com/3/52e945ee05b444f992910a0dee58a4a5.html?version=52e9461be5060',
				document:document
			});
			expect(ad.element.nodeName).to.be.equal('IFRAME');
			expect(ad.element.src).to.be.equal(ad.src);
		});
	});
});