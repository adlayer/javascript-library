/**
 * @class Click
 * @extends Log
 * @implements Salvable
 */
var Click = function(){
	var Log = require('./log').Log;
	var Salvable = require('./salvable').Salvable;
	Log.apply(this,arguments);
	Salvable.apply(this,arguments);
	this.type = "click";
};
exports.Click = Click;