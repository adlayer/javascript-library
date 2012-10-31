/**
* @module spaces
*/

(function(){
	var BasicSpace = require('./basic_space').BasicSpace;
	/**
	* Represents the type Expander space
	*
	* @class ExpandableSpace
	* @extends SpaceDom
	* @implements ISpace
	*/
	var ExpandableSpace = function(){
		BasicSpace.apply(this, arguments);
		
		this.expandEvent = 'mouseover';
		this.retreatEvent = 'mouseout';
		
		var __construct = (function(self){
			self.element = self.element || self.getElement() || self.create('DIV');
			self.element.id = self.id;
			self.element.style.height = self.height;
			self.element.style.width = self.width;
			// http://blog.vamapaull.com/using-externalinterface-and-js-to-make-an-expandable-flash-banner/
			self.element.style.position = "absolute";
			
			self.addDomEventListener(self.expandEvent, function(){
				self.expand();
				self.state = 'expanded';
			});
			
			self.addDomEventListener(self.retreatEvent, function(){
				self.retract();
				self.state = 'retreated';
			});
			self.retract();
		})(this);
	};
	ExpandableSpace.prototype = new BasicSpace();
	
	/**
	* @method clip
	* @param {Number} width
	* @param {Number} height
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
			var width = childAd.style.width || (childAd.width + 'px');
			var height = childAd.style.height || (childAd.height + 'px');
			this.clip(width, height);
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