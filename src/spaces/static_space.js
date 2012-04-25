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
			self.create('DIV');
			self.element.height = self.height;
			self.element.width = self.width;
			self.element.id = self.id;
		})(this);
	};
	StaticSpace.prototype = new SpaceDom();
	
	exports.StaticSpace = StaticSpace;
})();