/**
 * @class ImgTag
 * @param src
 * @return {element}
 */
var ImgTag = function (src) {
	var Size = require('../size').size;
	Size.apply(this,arguments);
	
	this.src = src;
	this.element = {};
	var __construct = function (_self) {
		_self.element = document.createElement("img");
		_self.element.src = _self.src;
	}(this);
	return this.element;
};
exports.img_tag = ImgTag;