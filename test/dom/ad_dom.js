var expect = expect || require('expect.js');
if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow(),
		document = window.document;
}

var AdDom = require('../../src/dom/ad_dom').AdDom;
describe('AdDom', function(){
	
	var space = document.createElement('div');
	space.id = 'uuid1293904';
	
	var ad = new AdDom({
		id: '10',
		campaign_id: '1235',
		link: 'http://www.adlayer.com.br',
		element: document.createElement('img')
	});

	describe('#getSpaceId', function(){

		it('Should return the id of contextual space', function(){
			space.appendChild(ad.element);
			expect(ad.getSpaceId()).to.be.equal('uuid1293904');
			space.removeChild(ad.element);
		});
		
		it('Should find a non direct parent space', function(){
			var wrapper = document.createElement('a');
			wrapper.id = 'wrapper';
			wrapper.appendChild(ad.element);
			space.appendChild(wrapper);
			expect(ad.getSpaceId()).to.be.equal('uuid1293904');	
		});

	});
	
	describe('#getClickTag', function(){
		
		it('Should build a clickTag url', function(){
			var page_url = 'http://test.com';
			var clickTag = ad.getClickTag('http://tracker.adlayerapp.com', '9292', '3030', page_url);
			expect(clickTag).to.contain('click/10');
		});
	});
});