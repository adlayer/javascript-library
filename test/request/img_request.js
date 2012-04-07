var expect = expect || require('expect.js');
if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow(),
		document = window.document;
}

var ImgRequest = require('../../src/request/img_request').ImgRequest;

describe('ImgRequest', function(){	
	describe('#send', function(){
		it('Should send a request', function(){
			var run = false;
			
			var request = new ImgRequest({
				host: 'localhost',
				path: '/',
			}, function(err, response){
				run = true;
			});
			request.callback();
			expect(run).to.be.ok();
			request.document = document;
			request.send();
		});
	});
});