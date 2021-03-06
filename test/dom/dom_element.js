var expect = expect || require('expect.js');

if(typeof this.document === 'undefined'){
	var document = require('../document');
}

	
var DomElement = require('../../src/dom/dom_element').DomElement;

describe('DomElement', function(){
	describe('.create', function(){
		it('Should create a dom Element', function(){
			expect(	DomElement.create('div', document).nodeName ).to.be.equal('DIV');
		});
	});
	describe('#create', function(){
		it('Should create a dom Element and store at this.element', function(){
			expect(	new DomElement().create('div', document).nodeName).to.be.equal('DIV');
		});
	});
	
	describe('#setAttributes', function(){
		it('Should set as attributes given hash', function(){
			var element = new DomElement();
			element.create('img', document);
			element.setAttributes({
				src: 'whatever',
				id: '10',
				rel: '10'
			});
			expect(	element.element.rel ).to.be.equal( '10' );
		});
	});
	describe('#append', function(){
		it('Should append a child', function(){
			var div = new DomElement();
			div.create('div', document);
			div.append(document.createElement('a'));
			expect(div.element.childNodes.length).to.be(1);
		});
	});
	describe('#findParentTag', function(){
		it('Should find a specified tag ad parent', function(){
			var root = new DomElement();
			root.create('div', document);
			
			var	midle = new DomElement();
			midle.create('span', document);
			
			var	access = new DomElement();
			access.create('a', document);
			
			midle.append(access.element);
			root.append(midle.element);
			expect( access.findParentTag('DIV') === root.element ).to.be.ok();
		});
	});
	describe('#addDomEventListener', function(){
		it('Should observe an dom event', function(){
			var run = false;
			
			var anchor = new DomElement();
			anchor.create('a', document);
			
			anchor.addDomEventListener('click', function(){
				run = true;
			});
			
			(function simulateClick() {
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, {}, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				anchor.element.dispatchEvent(evt);
			})();
			
			expect(run).to.be.ok();
		});
	});
});