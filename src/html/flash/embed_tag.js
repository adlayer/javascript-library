/** 
* @class EmbedTag
* @extends {Size}
* @extends {Flash}
* <embed></embed> 
*/
var EmbedTag = function(){
	var Flash = require('./flash').flash;
	Flash.apply(this, arguments);

	/* @private */
	var __construct = (function(_self){
		_self.src = _self.src;
		_self.element = document.createElement("embed");
		
		_self.extendAttributes(_self);
	})(this);
	return this.element;
};
exports.EmbedTag = EmbedTag;