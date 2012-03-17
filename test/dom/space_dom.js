var expect = expect || require('expect.js');
if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow();
		global.document = window.document;
}

var SpaceDom = require('../../src/dom/space_dom').SpaceDom;
var AdDom = require('../../src/dom/ad_dom').AdDom;

describe('SpaceDom', function(){
	describe('#placeAd', function(){
		it('Should append an Ad into space element', function(){
			
			var space = new SpaceDom();
			space.element = document.createElement('div');
			
			var ad = new AdDom();
			ad.element = document.createElement('a');
			space.placeAd(ad);
			
			expect(space.element.childNodes.length).to.be(1);
		});
	});
});