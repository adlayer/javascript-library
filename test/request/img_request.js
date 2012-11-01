var expect = expect || require('expect.js');
var document = document || require('../document');

var ImgRequest = require('../../src/request/img_request').ImgRequest;

describe('ImgRequest', function(){	
	describe('#send', function(){
		it('Should send a request', function(){
			var run = false;
			ImgRequest.document = document;
			var request = new ImgRequest({
				host: 'localhost',
				path: '/'
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