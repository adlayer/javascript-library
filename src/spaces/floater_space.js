/**
* @class represents the type Floater
* @extends Space
* @implements ISpace
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	var FloaterSpace = function(){
		SpaceDom.apply(this, arguments);
		/**
		* @public
		*/
		this.close = function(){
			var space = this.element;
			space.parentNode.removeChild(space);
			delete this.element;
		};
		
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.id = self.id;
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			self.element.style.position = 'absolute';
			
			var bt = self.document.createElement('BUTTON');
			bt.innerHTML = 'x';
			self.append(bt);
			
		})(this);
	};
	FloaterSpace.prototype = new SpaceDom();
	exports.FloaterSpace = FloaterSpace;
})();