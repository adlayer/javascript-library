/**
* Core class
*
* @class Core
* @constructor
*/
var Core = function(){
	/*
	* @method extend
	* @privileged
	* @returns {Object} return this to allow chain pattern
	*/
	this.extend = function(attributes){
		// initiate here
		for( var attribute in attributes ){
			if( attributes.hasOwnProperty(attribute) ){
				this[attribute] = attributes[attribute];
			}
		}
		return this;
	};
};
exports.Core = Core;