var expect = expect || require('expect.js');
var document = document || require('../document');

var SpaceDom = require('../../src/dom/space_dom').SpaceDom;
var AdDom = require('../../src/dom/ad_dom').AdDom;

describe('SpaceDom', function(){
	
	describe('#getElement', function(){
		it('Should not	 find the element', function(){
			
			var space = new SpaceDom({
				id: 'any',
				document: document
			});
			
			expect(space.getElement()).to.not.ok();
		});
		
		it('Should find the element', function(){
			var div = document.createElement('div');
			div.id = "any";
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(div);

			var space = new SpaceDom({
				id: 'any',
				document: document
			});
			
			expect(space.getElement().id).to.equal(div.id);
		});
	});
	
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