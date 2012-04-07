var expect = expect || require('expect.js');
if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow(),
		document = window.document;
}

var ImgRequest = require('../../src/request/jsonp_request').JsonpRequest;

describe('ImgRequest', function(){	
	describe('#send', function(){
		it('Should send a request', function(){
			var run = false;
			
			var request = new ImgRequest({
				host: 'localhost',
				path: '/',
			}, function(err, response){
				expect(err).to.be.ok();
			});
			request.document = document;
			request.send();
		});
	});
});