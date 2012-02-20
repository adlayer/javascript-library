/**
 * @class Format
 * @extends	Size
 * @param {number} width
 * @param {number} height
 * @param {string} type
 */
var Format = function(width,height,type){
	var Size = require('./size').size;
	Size.apply(this,arguments);
	
	this.type = type;
};
exports.format = Format;