/**
 * @class Impression
 * @extends Log
 * @implements Salvable
 */
var Impression = function(){
	var Log = require('./log').Log;
	var Salvable = require('./salvable').Salvable;
	Log.apply(this,arguments);
	Salvable.apply(this,arguments);
	this.type = "impression";
};
exports.Impression = Impression;