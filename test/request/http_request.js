var expect = expect || require('expect.js');

var HttpRequest = require('../../src/request/http_request').HttpRequest;

describe('HttpRequest', function(){
	
	describe('#getUrl', function(){
		describe('Fully url', function(){
			it('Should get the full URL', function(){
				var request = new HttpRequest('http://localhost/?test=ok');
				expect(request.getUrl()).to.be.equal('http://localhost/?test=ok');
			});
		});

		describe('Configured url', function(){
			it('Should get the full URL', function(){
				var request = new HttpRequest();
				request.host = 'localhost';
				request.path = '/';
				request.query = 'test=ok';
				expect(request.getUrl()).to.be.equal('http://localhost/?test=ok');
			});
		});
	});
});