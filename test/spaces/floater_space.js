var expect = expect || require('expect.js');
var document = document || require('../document');

var FloaterSpace = require('../../src/spaces/floater_space').FloaterSpace;
describe('FloaterSpace', function(){
	describe('__construct', function(){
		it('Should render the space', function(){
			var space = new FloaterSpace({
				document: document,
				id: '10',
				height:'300px',
				width: '300px'
			});
			expect(space.element.height).to.be.equal(space.height);
			expect(space.element.width).to.be.equal(space.width);
			expect(space.element.id).to.be.equal(space.id);
			expect(space.element.ads).to.not.be.equal(space.ads);
			expect(space.element.firstChild.nodeName).to.be.equal('BUTTON');
		});
	});
	describe('close', function(){
		it('Should close the space', function(){
			var space = new FloaterSpace({
				document: document,
				id: '10',
				height:'300px',
				width: '300px'
			});
			var header = document.createElement('HEADER');
			header.appendChild(space.element);
			space.close();
			expect(space.element.nodeName).to.be(undefined);
		});
	});
});