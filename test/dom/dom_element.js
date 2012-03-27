var expect = expect || require('expect.js');

if(!this.document){
	var jsdom  = require("jsdom").jsdom,
		context = jsdom(null),
		window = context.createWindow();
		global.document = window.document;
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
			expect(	new DomElement().create('div', document).element.nodeName ).to.be.equal('DIV');
		});
	});
	describe('#append', function(){
		it('Should append a child', function(){
			var div = new DomElement().create('div', document);
			div.append(document.createElement('a'));
			expect(div.element.childNodes.length).to.be(1);
		});
	});
	describe('#findParentTag', function(){
		it('Should find a specified tag ad parent', function(){
			var root = new DomElement().create('div', document),
				midle = new DomElement().create('span', document),
				access = new DomElement().create('a', document);
			midle.append(access.element);
			root.append(midle.element);
			expect( access.findParentTag('DIV') === root.element ).to.be.ok();
		});
	});
	describe('#addEventListener', function(){
		it('Should observe an dom event', function(){
			var run = false;
			
			var anchor = new DomElement();
			anchor.create('a', document);
			
			anchor.addEventListener('click', function(){
				run = true;
			});
			
			(function simulateClick() {
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				anchor.element.dispatchEvent(evt);
			})();
			
			expect(run).to.be.ok();
		});
	});
});