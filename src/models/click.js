/**
 * @class Click
 * @extends Log
 * @implements Salvable
 */
var Click = function(){
	Log.apply(this,arguments);
	this.type = "click";
};
Click.prototype = new Saveble();
exports.click = Click;