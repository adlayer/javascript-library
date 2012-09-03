/**
* @module spaces
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	/**
	* Represents the type Static
	* 
	* @class StaticSpace
	* @extends SpaceDom
	*/	
	var StaticSpace = function(){
		SpaceDom.apply(this, arguments);
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			self.element.id = self.id;
		})(this);
	};
	StaticSpace.prototype = new SpaceDom();
	
	exports.StaticSpace = StaticSpace;
})();