/**
 * @class AnchorTag
 * @param id
 * @param text
 * @param href
 * @return {element}
 */
var AnchorTag = function (id, href, rel) {
	var Size = require('../size').size;
	Size.apply(this,arguments);
	this.href = href;
	this.rel = rel;
	this.id = id;
	this.element = {};
	
	var __construct = function (_self) {
		_self.element = document.createElement("a");
		_self.element.href = _self.href;
		_self.element.rel = _self.rel;
		_self.element.id = _self.id;
	}(this);
	return this.element;
};
exports.anchor_tag = AnchorTag;