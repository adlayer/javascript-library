/**
* @class represents the type Expandable
* @extends Space
* @implements ISpace
*/
var ExpandableSpace = function(){
	var ISpace = require('./ispace').ispace;
	var Space = require('./space').space;
	
	ISpace.call(this);
	Space.apply(this,arguments);
	
	/**
	* @public
	* @return {Object}
	*/
	this.clip = function(width, height){
		this.element.style.clip = "rect(0px " + width + " " + height + " 0px)";
		return this;
	};
	
	/**
	* @public
	* @return {Object}
	*/
	this.expand = function(){
		var childAd = this.element.firstChild;
		if(childAd){
			this.clip(childAd.width, childAd.height);
			return this;
		}
	};
	
	/**
	* @public
	* @return {Object}
	*/
	this.retract = function(){
		this.clip(this.size.width, this.size.height);
		return this;
	};
	
	/**
	* @public
	* @return {Object}
	*/
	this.render = function(){
		var _self = this;
		this.element.style.position = "absolute";
		this.setSizes();
		this.clip(this.size.width, this.size.height);
		this.insertRandomAd();
		
		this.element.onmouseover = function(){
			_self.expand();
		};
		this.element.onmouseout = function(){
			_self.retract();
		};
		
		return this.element;
	};
};
exports.expandable_space = ExpandableSpace;