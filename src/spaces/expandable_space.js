/**
* @module spaces
*/

(function(){
	var SpaceDom = require('../dom/space_dom').SpaceDom;
	/**
	* Represents the type Expander space
	*
	* @class ExpandableSpace
	* @extends SpaceDom
	* @implements ISpace
	*/
	var ExpandableSpace = function(){
		SpaceDom.apply(this, arguments);
		
		
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.id = self.id;
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			
			self.addDomEventListener(self.expandEvent, function(){
				self.expand();
				self.state = 'expanded';
			});
			
			self.addDomEventListener(self.retreatEvent, function(){
//				self.retract();
				self.state = 'retreated';
			});
			
		})(this);
	};
	ExpandableSpace.prototype = new SpaceDom();
	
	/**
	* @method clip
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.clip = function(width, height){
		this.element.style.clip = "rect(0px " + width + " " + height + " 0px)";
		return this;
	};
	
	/**
	* @method expand
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.expand = function(){
		var childAd = this.element.firstChild;
		if(childAd){
			this.clip(childAd.width, childAd.height);
			return this;
		}
	};
	
	/**
	* @method retract
	* @public
	* @return {Object}
	*/
	ExpandableSpace.prototype.retract = function(){
		this.clip(this.width, this.height);
		return this;
	};
	

	exports.ExpandableSpace = ExpandableSpace;
})();