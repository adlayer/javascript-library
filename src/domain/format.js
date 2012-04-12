/**
* Abstract class for Formats
*
* @class
* @constructor
* @param {Object} attributes
*/
var Format = function(){
	/**
	* @property {String} type Typeof object
	*/
	this.type = '';
	/**
	* @property {String} height Height of object
	*/
	this.height = 0;
	/**
	* @property {String} width Width object
	*/
	this.width = 0;
};
exports.Format = Format;