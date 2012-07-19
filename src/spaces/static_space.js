/**
* @class represents the type Static
* @extends SpaceDom
* @implements ISpace
*/
(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	
	var StaticSpace = function(){
		SpaceDom.apply(this, arguments);
		var __construct = (function(self){
			self.element = self.element || self.create('DIV');
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			self.element.id = self.id;
		})(this);
	};
	StaticSpace.prototype = new SpaceDom();
	
	exports.StaticSpace = StaticSpace;
})();