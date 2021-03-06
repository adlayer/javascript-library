var expect = expect || require('expect.js');

var Event = require('../../src/domain/event').Event;

describe('Event', function(){
	
	describe('#getFullDate', function(){
		it('Should convert date to ISOString', function(){
			var click = new Event();
			expect(click.getFullDate()).to.be.an('string');
		});
	});
	
	describe('#getDate', function(){
		var click = new Event();
		it('Should return the first part of a fulldate', function(){
			expect(click.getFullDate()).to.contain(click.getDate());
		});
		it('Should be a part of a DateISOString', function(){
			expect(click.getDate().split('-').length).to.be(3);
		});
	});
	
	describe('#getTime', function(){
		var click = new Event();
		it('Should return the second part of fulldate', function(){
			expect(click.getFullDate()).to.contain(click.getTime());
		});
		it('Should be a part of a DateISOString', function(){
			expect(click.getTime()).to.contain(':');
			expect(click.getTime().split(':').length).to.be(3);
		});
	});
	
	describe('#getHour', function(){
		it('Should return the first part of time attribute', function(){
			var click = new Event({
				time: '17:12:37.679Z'
			});
			expect(click.getHour()).to.be.equal('17');
		});
	});
	
	describe('#validate', function(){
		it('should fail when some attribute is not present', function(){
			var click = new Event();
			expect(click.validate()).to.be(false);
		});
		it('should validate when all required attributes are present', function(){
			var click = new Event({
				type: 'click',
				campaign_id: '123',
				ad_id: '456',
				space_id: '789',
				site_id: '101',
				page_id: 'http://adlayerjavascriptlibrary.com/home',
				page_url: 'http://adlayerjavascriptlibrary.com/home'
			});
			expect(click.validate()).to.be(true);
		});
	});
	
	
	describe('#toQuery', function(){
		it('should convert to querystring version of object', function(){
			var click = new Event({
				type: 'click',
				campaign_id: '123',
				ad_id: '456',
				space_id: '789',
				site_id: '101',
				page_url: 'http://adlayerjavascriptlibrary.com/home'
			});
			var str = 'type=click&campaign_id=123&ad_id=456&space_id=789&site_id=101&page_url=http://adlayerjavascriptlibrary.com/home';
			expect(click.toQuery()).to.be(str);
		});
		it('should not convert functions to querystring', function(){
			var click = new Event({
				type: 'click',
				test:function(){}
			});
			expect(click.toQuery()).to.not.contain('test');
		});
	});
	
	describe('#save', function(){
		it('should throw error to override', function(){
			expect(new Event().save).to.throwError('You should override this');
		});
	});
	
	describe('.track', function(){
		it('should save an event', function(){
			var click = new Event();
			expect(Event.track).to.throwError('You should override this');
		});
	});
});