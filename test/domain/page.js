var expect = expect || require('expect.js');

var Page = require('../../src/domain/page').Page;
var Space = require('../../src/domain/space').Space;
var Ad = require('../../src/domain/ad').Ad;

describe('Page', function(){
	describe('#getActiveContent', function(){
		var space1 = new Space({
			id: '1',
			status: true,
			ads: [
				new Ad({status:true}), 
				new Ad({status:false})
			]
		});

		var page = new Page({
			id: '123',
			name: 'TestUnit',
			spaces: [space1],
			status: true
		});
		it('should filter all content by status true', function(){
			
			var result = page.getActiveContent();
			var adsInSpace1 = result.spaces[0]['ads'];
			expect(adsInSpace1.length).to.be(1);
			
		});
		it('should return a full space when there is no ads', function(){
			var space = page.spaces[0];
			delete space['ads'];
			var result = page.getActiveContent();
			expect(result.spaces[0]).to.be(space);
		});
	});
});