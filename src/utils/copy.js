// Prototype pattern Object.create() in old browsers
function copy(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}
exports.copy = copy;