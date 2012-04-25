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

		/**
		* @public
		* @return {Object}
		*/
		this.render = function(){
			this.setSizes();
			this.element.style.position = "absolute";

			var bt = document.createElement("button");
			bt.innerHTML = "fechar";
			bt.onclick = this.close;
			this.element.appendChild(bt);

			this.insertRandomAd();
			return this.element;
		};
		
		var __construct = (function(self){
			self.create('DIV');
			self.element.id = self.id;
			self.element.height = self.height;
			self.element.width = self.width;
			self.element.style.position = 'absolute';
			self.append(self.document.createElement('BUTTON'));
		})(this);
	};
	FloaterSpace.prototype = new SpaceDom();
	exports.FloaterSpace = FloaterSpace;
})();