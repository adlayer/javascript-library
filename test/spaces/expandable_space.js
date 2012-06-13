var expect = expect || require('expect.js');
var document = document || require('../document');

var ExpandableSpace = require('../../src/spaces/expandable_space').ExpandableSpace;
describe('ExpandableSpace', function(){
	var space;
	
	describe('__construct', function(){
		it('Should render the space', function(){
			space = new ExpandableSpace({
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
		
		});
	});
	
	describe('#expand', function(){
		it('Should expand the space', function(){
			// Expanding
			(function(){
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("mouseover", true, true, {}, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				space.element.dispatchEvent(evt);
			})();
			expect(space.state).to.be.equal('expanded');
		});
	});
	
	describe('#retreat', function(){
		it('Should retreat the space', function(){
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