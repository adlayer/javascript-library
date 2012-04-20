var expect = expect || require('expect.js');
var document = document || require('../document');

var JsonpRequest = require('../../src/request/jsonp_request').JsonpRequest;
JsonpRequest.document = document;

describe('JsonpRequest', function(){

	describe('#queryCallback', function(){
		it('Should configure the callback namespace', function(){
			var request = new JsonpRequest({
				host: 'localhost',
				path: '/'
			}, function(err, response){
				run = true;
			});
			request.queryCallback('root.adlayer');
			expect(request.getUrl()).to.contain('root.adlayer');
		});
	});	

	
	describe('#validate', function(){
		it('Should validate when found callback', function(){
			var root = {};
			var run = false;
			
			var request = new JsonpRequest({
				host: 'localhost',
				path: '/'
			});
			request.queryCallback('root.callback');
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
			request.send();
		});
	});
	
	describe('make', function(){
		it('Should make a request', function(){			
			var request = JsonpRequest.make({}, function(){});
			expect(request instanceof JsonpRequest).to.be.ok();
		});
	});
});