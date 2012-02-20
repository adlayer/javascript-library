/**
* @class represents the type Static
* @extends Space
* @implements ISpace
*/
var StaticSpace = function(){
	var ISpace = require('./ispace').ispace;
	var Space = require('./space').space;
	
	ISpace.call(this);
	Space.apply(this,arguments);
	
	/**
	* @public
	* @return {Object}
	*/
	this.render = function(){
		this.setSizes();
		this.insertRandomAd();
		return this.element;
	};
};
exports.static_space = StaticSpace;