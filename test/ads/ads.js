var expect = expect || require('expect.js');
var document = document || require('../document');

var ImgAd = require('../../src/ads/img_ad').ImgAd;
var ads = require('../../src/ads/ads').ads;
describe('ads', function(){
	describe('create', function(){
		it('Should return a created ad', function(){
			var ad = ads.create({
				id: '10',
				document: document,
				src: 'http://adlayer.com.br/img/logo.png',
				type: 'image'
			});
			expect(ad instanceof ImgAd).to.be.ok();
		});
	});
});