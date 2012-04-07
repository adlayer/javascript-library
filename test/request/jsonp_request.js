var expect = expect || require('expect.js');
if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow(),
		document = window.document;
}

var JsonpRequest = require('../../src/request/jsonp_request').JsonpRequest;

describe('JsonpRequest', function(){
	
	describe('#setCallback', function(){
		it('Should set the JSONP callback namespace into querystring', function(){
			var request = new JsonpRequest({
				host: 'localhost',
				path: '/'
			});
			request.qs = {test: 'ok'};
			request.setCallback('root.callback');
			expect(request.getUrl()).to.contain('callback=root.callback');
		});
		it('Should assign to query string and as callback', function(){
			var run = false;
			var request = new JsonpRequest({
				host: 'localhost',
				path: '/'
			});
			request.qs = {test: 'ok'};
			request.setCallback('root.callback', function(){
				run = true;
			});
			request.callback();
			expect(request.callback).to.be.ok();
			expect(run).to.be.ok();
		});
	});
	
	describe('#expose', function(){
		it('Should expose the callback function to an provide object', function(){
			var root = {};
			var run = false;
			
			var request = new JsonpRequest({
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
	describe('wrap', function(){
		it('Should get an error', function(){
			var root = {};
			var run = false;
			
			var request = new JsonpRequest({
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
			
			var request = new JsonpRequest({
				host: 'localhost',
				path: '/'
			}, function(err, response){
				expect(response).to.be.ok();
			});
			
			request.expose(root);
			root.callback({ok:true});

		});
	})
	
	describe('#validate', function(){
		it('Should validate when found callback', function(){
			var root = {};
			var run = false;
			
			var request = new JsonpRequest({
				host: 'localhost',
				path: '/'
			});
			request.setCallback('root.callback');
			expect(request.validate()).to.be.ok();
		});
		it('Should not validate without callback', function(){
			var root = {};
			var run = false;
			
			var request = new JsonpRequest({
				host: 'localhost',
				path: '/'
			});
			expect(request.validate()).to.be(false);
		});
	});
	
	describe('#send', function(){
		it('Should send a request', function(){
			var root = {};
			var run = false;
			
			var request = new JsonpRequest({
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