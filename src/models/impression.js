/**
 * @class Impression
 * @extends Log
 * @implements Salvable
 */
var Impression = function(){
	Log.apply(this,arguments);
	this.type = "impression";
};
Impression.prototype = new Saveble();
exports.impression = Impression;