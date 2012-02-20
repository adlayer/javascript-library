/**
* @class represents the type Floater
* @extends Space
* @implements ISpace
*/
var FloaterSpace = function(){
	var ISpace = require('./ispace').ispace;
	var Space = require('./space').space;
	
	ISpace.call(this);
	Space.apply(this,arguments);
	
	var _self = this;

	/**
	* @public
	*/
	this.close = function(){
		var space = _self.element;
		space.parentNode.removeChild(space);
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
};
exports.floater_space = FloaterSpace;