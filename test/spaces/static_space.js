var expect = expect || require('expect.js');
var document = document || require('../document');

var StaticSpace = require('../../src/spaces/static_space').StaticSpace;
describe('StaticSpace', function(){
	describe('__construct', function(){
		it('Should render the space', function(){
			var space = new StaticSpace({
				document: document,
				id: '10',
				height:'300px',
				width: '300px'
			});
			expect(space.element.height).to.be.equal(space.height);
			expect(space.element.width).to.be.equal(space.width);
			expect(space.element.id).to.be.equal(space.id);
			expect(space.element.ads).to.not.be.equal(space.ads);
		});
	});
});