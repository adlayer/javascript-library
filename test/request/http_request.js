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
			var root = {};
			var run = false;
			
			var request = new HttpRequest({
				host: 'localhost',
				path: '/'
			}, function(err, response){
				expect(err).to.be.ok();
			});
			
			request.expose(root);
			root.callback();

		});
		it('Should get a result', function(){
			var root = {};
			var run = false;
			
			var request = new HttpRequest({
				host: 'localhost',
				path: '/'
			}, function(err, response){
				expect(response).to.be.ok();
			});
			
			request.expose(root);
			root.callback({ok:true});
		});
	});
	
	describe('#expose', function(){
		it('Should expose the callback function to an provide object', function(){
			var root = {};
			var run = false;
			
			var request = new HttpRequest({
				host: 'localhost',
				path: '/'
			}, function(err, response){
				run = true;
			});
			
			request.expose(root);
			// Should expose
			expect(root.callback).to.be.ok();
			// Should expose a function
			expect(root.callback).to.be.a('function');
			// Should be executable
			root.callback({ok:true});
			expect(run).to.be.ok();
		});
	});
});