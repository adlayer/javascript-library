var expect = expect || require('expect.js');
if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow();
		global.document = window.document;
}

var AdDom = require('../../src/dom/ad_dom').AdDom;
describe('AdDom', function(){
	
	var ad  = new AdDom({
		id: '10',
		campaign_id: '1235',
		link: 'http://www.adlayer.com.br',
	});
	
	ad.element = document.createElement('a');
	
	describe('#getSpaceId', function(){
		it('Should return the id of contextual space', function(){
			var space = document.createElement('div');
			space.id = 'uuid1293904';
			space.appendChild(ad.element);
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(space);
			
			expect(ad.getSpaceId()).to.be.equal('uuid1293904');
			
		});
	});
	
	describe('#getClickTag', function(){
		
		it('Should build a clickTag url', function(){
			var url = 'http://test.com';
			var clickTag = ad.getClickTag('http://tracker.adlayerapp.com', '9292', '3030', url);
			expect(clickTag).to.contain('click/10');
		});
	});
});