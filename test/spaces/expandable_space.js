var expect = expect || require('expect.js');
var document = document || require('../document');

var ExpandableSpace = require('../../src/spaces/expandable_space').ExpandableSpace;
describe('ExpandableSpace', function(){
	describe('__construct', function(){
		it('Should render the space', function(){
			var space = new ExpandableSpace({
				document: document,
				expandEvent: 'mouseover',
				retreatEvent: 'mouseout',
				id: '10',
				height:'300px',
				width: '300px'
			});
			expect(space.element.height).to.be.equal(space.height);
			expect(space.element.width).to.be.equal(space.width);
			expect(space.element.id).to.be.equal(space.id);
			expect(space.element.ads).to.not.be.equal(space.ads);
			
			// Expanding
			(function(){
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("mouseover", true, true, {}, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				space.element.dispatchEvent(evt);
			})();
			expect(space.state).to.be.equal('expanded');
			
			// Retreating
			(function(){
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("mouseout", true, true, {}, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				space.element.dispatchEvent(evt);
			})();
			expect(space.state).to.be.equal('retreated');
		});
	});
});