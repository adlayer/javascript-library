var expect = expect || require('expect.js');
var document = document || require('../document');

var ObjectAd = require('../../src/ads/object_ad').ObjectAd;
describe('ObjectAd', function(){
	describe('__construct', function(){
		it('Should defined an element and set de source', function(){
			var ad = new ObjectAd({
				id: '10',
				src: 'http://adlayer.com.br/img/logo.swf',
				document:document,
				link: 'http://adlayer.com.br'
			});
			expect(ad.element.nodeName).to.be.equal('OBJECT');
		});
	});
});