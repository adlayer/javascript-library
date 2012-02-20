/** 
* @class EmbedTag
* @extends {Size}
* @extends {Flash}
* <embed></embed> 
*/
var EmbedTag = function(){
	var Size = require('../../size').size;
	var Flash = require('./flash').flash;
	Size.apply(this, arguments);
	Flash.apply(this, arguments);
	
	/* @private */
	var __construct = function(_self){
		_self.src = _self.getSrc();
		_self.element = document.createElement("embed");
		
		_self.extendAttributes(_self);

	}(this);
	return this.element;
};
exports.embed_tag = EmbedTag;