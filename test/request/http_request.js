var expect = expect || require('expect.js');

var HttpRequest = require('../../src/request/http_request').HttpRequest;

describe('Http', function(){
	
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
				request.qs = {
					anyquery: 'ok'
				};
				request.query = 'test=ok';
				expect(request.getUrl()).to.be.equal('http://localhost/?test=ok&anyquery=ok');
			});
		});
	});
	
	
	describe('wrap', function(){
		it('Should get an error', function(){
			var run = false;
			
			var request = new HttpRequest({
				host: 'localhost',
				path: '/'
			}, function(err, response){
				expect(err).to.be.ok();
			});
			
			request.callback(true);

		});
		it('Should get a result', function(){
			var run = false;
			
			var request = new HttpRequest({
				host: 'localhost',
				path: '/'
			}, function(err, response){
				expect(response).to.be.ok();
			});
			
			request.callback(null, {ok:true});
		});
	});
});