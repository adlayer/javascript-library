/**
* @module utils
* @class Utils
* @static
*/

/**
* Prototype pattern Object.create() in old browsers
* @method copy
* @param {Object} obj
*/
function copy(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}
exports.copy = copy;