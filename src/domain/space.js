/**
* @module core
*/

/**
* Interface for space behaviour
*
* @class ISpaceBehaviour
* @interface ISpaceBehaviour
* @constructor
*/
var ISpaceBehaviour = function(){
	this.getAd = function(context){ throw new Error('Implement it'); };
};
exports.ISpaceBehaviour = ISpaceBehaviour;

/**
* Random behaviour for spaces
*
* @class RandomBehaviour
* @constructor
*/
var RandomSpaceBehaviour = function(){
	/**
	* @method getAd
	* @param {Space} context Expect space 'this' as argument
	* @return {Object} Ad
	*/
	this.getAd = function(context){ 
		var total = context.ads.length;
		var index = Math.floor(Math.random() * total);
		return context.ads[index];
	};
};

/**
* Abstract class for spaces
*
* @class Space
* @constructor
* @extends Core
* @param {Object} attributes
*/
var Space = function( attributes ){
	var Core = require('./core').Core;
	Core.apply(this, arguments);
	/**
	* Unique space id
	* @property id
	* @type string
	*/
	this.id = '';
	/**
	* Type of space
	* @property type
	* @type string
	*/
	this.type = '';
	/**
	* true for active and false for inactive
	* @property status
	* @type boolean
	*/
	this.status = '';
	/**
	* Collection of ads linked to space
	* @property ads
	* @type array
	*/
	this.ads = [];
	
	/**
	* behaviour a part of strategy pattern
	* @property behaviour 
	* @type SpaceBehaviour
	*/
	this.behaviour = {};

	/**
	* @method setBehaviour
	* @param {Object} behaviour 
	* @return {Object} Ad
	*/
	this.setBehaviour = function(behaviour){
		this.behaviour = behaviour;
		return this.behaviour;
	};
	
		
	/**
	* @method getAd
	* @return {Object} Ad
	*/
	this.getAd = function(){
		return this.behaviour.getAd(this);
	};
	
	/*
	* @method __construct
	* @private
	* @returns {Object} return this to allow chain pattern
	*/
	var __construct = function(self){
		self = self.extend(attributes);
		self.setBehaviour(new RandomSpaceBehaviour());
	}(this);
};

	exports.Space = Space;