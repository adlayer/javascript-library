/**
* @interface ISpace
*/
var ISpace = function(){
	this.render = function(){ return new Error("not implemented");};
	this.insertAd = function(){return new Error("not implemented");};
};
exports.ispace = ISpace;