var expect = expect || require('expect.js');
var document = document || require('../document');

var Connection = require('../../src/connection/connection').Connection;

describe('Connection', function(){

	describe('#id', function(){
		it('Should return the current incremental id prefixed by n', function(){
			var adserver = new Connection({
				name: 'adlayer.adserver',
				host: 'adserver.adlayerapp.com'
			});
			expect(adserver.id()).to.be.equal('n0');
			
		});
	});
	
	describe('#newId', function(){
		it('Should return the new incremental id prefixed by n', function(){
			var adserver = new Connection({
				name: 'adlayer.adserver',
				host: 'adserver.adlayerapp.com'
			});
			adserver.newId();
			expect(adserver.newId()).to.be.equal('n2');
			
		});
	});
	
	describe('#next', function(){
		it('Should append a new request', function(){
			var tracker = new Connection({
				name: 'adlayer.tracker',
				host: 'tracker.adlayerapp.com'
			});

			tracker.next(tracker.get('/id/10', function(err, res){
				expect(err).to.be.ok();
			}));
			
			expect(tracker.requests.n0).to.be.ok();
		});
	});
	
	describe('#getCallbackPath', function(){
		it('Should return the full callback namespace', function(){
			var adserver = new Connection({
				name: 'adlayer.adserver',
				host: 'adserver.adlayerapp.com'
			});
			expect(adserver.getCallbackPath()).to.be.equal('adlayer.adserver.requests.n0.callback');
			
		});
	});
	
	describe('#get', function(){
		it('Should make a default get request', function(){
			var tracker = new Connection({
				name: 'adlayer.tracker',
				host: 'tracker.adlayerapp.com'
			});

			tracker.get('/id/10', function(err, res){
				expect(err).to.be.ok();
			});
			expect(tracker.getUrl()).to.be.contain('http://tracker.adlayerapp.com/id/10');
			expect(tracker.requests.n0).to.be.ok();
			expect(tracker.qs).to.have.property('callback');
			expect(tracker.qs.callback).to.be.equal('adlayer.tracker.requests.n0.callback');
		});
	});
	
});